const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");
const redis = require("../config/redis");

class User {
  static userCollection() {
    return database.collection("users");
  }

  static async findAll() {

    const redisUser = await redis.get("users")
    if (redisUser) {
      return JSON.parse(redisUser)
    }else{

      const users = await User.userCollection().find().toArray();
      await redis.set("users", JSON.stringify(users))
      return users;
    }
  }

  static async findByUsername(username) {
    // console.log(data, "<<<<<<<<<");
    const find = await User.userCollection().findOne(
      {
        username,
      },
      {
        projection: {
          password: 0,
        },
      }
    );
    return find;
  }

  static async findByEmail(email) {
    // console.log(email, "<<<<<<<<<");
    const find = await User.userCollection().findOne(
      {
        email,
      }
    );

    return find;
  }

  static async findUserById(id) {
    // console.log(data, "<<<<<<<<<");
    const find = await User.userCollection().findOne({
      _id: new ObjectId(String(id)),
    },
    {
      projection: {
        password: 0,
      },
    });
    return find;
  }

  static async createOne(data) {
    // console.log(data, "<<<<<<<<<<<<<<DATA");

    const newUser = await User.userCollection().insertOne(data);
    await redis.del("users")
    return newUser;
  }

  static async getDetail(id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "Following",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "Following.followingId",
          foreignField: "_id",
          as: "FollowingData",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "Follower",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "Follower.followerId",
          foreignField: "_id",
          as: "FollowerData",
        },
      },
      {
        $project: {
          password: 0,
          "FollowingData.password": 0,
          "FollowerData.password": 0,
        },
      },
    ];

    const cursor = this.userCollection().aggregate(agg);

    const result = await cursor.toArray()
    // console.log(result);
    return result[0]
  }
}

module.exports = User;
