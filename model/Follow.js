const { ObjectId } = require("mongodb")
const { database } = require("../config/mongo")

class Follow{

    static followCollection(){
        return database.collection("follows")
    }

    static async findAll(){
        const follows = await Follow.followCollection().find().toArray()
        return follows
    }

    static async createOne(data){
        // console.log(data);
        data.followerId = new ObjectId(String(data.followerId))
        data.followingId = new ObjectId(String(data.followingId))
        const follows = await Follow.followCollection().insertOne(data)
        return follows
    }

}

module.exports = Follow