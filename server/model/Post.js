const { ObjectId } = require('mongodb');
const { database } = require('../config/mongo');
const redis = require('../config/redis');

class Post {
  static postCollection() {
    return database.collection('posts');
  }

  static async findAll() {
    // await redis.del("posts")
    const redisPost = await redis.get('posts');

    if (redisPost) {
      return JSON.parse(redisPost);
    } else {
      const agg = [
        {
          $lookup: {
            from: 'users',
            localField: 'authorId',
            foreignField: '_id',
            as: 'UserData',
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $unwind: {
            path: '$UserData',
          },
        },
      ];

      const cursor = Post.postCollection().aggregate(agg);

      const result = await cursor.toArray();
      await redis.set('posts', JSON.stringify(result));
      // console.log(result, "<<<<<<<<<<<<<<");
      return result;
    }
  }

  static async findById(id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'authorId',
          foreignField: '_id',
          as: 'UserData',
        },
      },
      {
        $unwind: '$UserData',
      },
    ];

    const cursor = Post.postCollection().aggregate(agg);

    const result = await cursor.toArray();
    if(result.length == 0) throw new Error("Post Not Found")
    // console.log(result.UserData, "<<<<<<<<<<<<<<");
    return result[0];
  }

  static async createOne(data) {
    const newPost = await Post.postCollection().insertOne(data);
    await redis.del('posts');
    return newPost;
  }

  static async createComment(data, postId) {
    const findPost = await Post.findById(postId);
    // if(!findPost) throw new Error("Post Not Found")

    const newComment = await Post.postCollection().updateOne(
      {
        _id: findPost._id,
      },
      { $push: { comments: data } }
    );
    await redis.del('posts');

    return data;
  }

  static async createLikes(data, postId) {
    const findPost = await Post.findById(postId);

    findPost.likes.map((item) => {
      if (item.username === data.username) {
        throw new Error('Already Liked This Post');
      }
    });

    const newComment = await Post.postCollection().updateOne(
      {
        _id: findPost._id,
      },
      { $push: { likes: data } }
    );
    await redis.del('posts');
    // console.log(findPost);
    return data;
  }
}

module.exports = Post;
