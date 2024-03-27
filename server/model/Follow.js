const { ObjectId } = require("mongodb")
const { database } = require("../config/mongo")
const User = require("../model/User");

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
    
        const notFound = await User.findUserById(data.followingId)
        if(!notFound) throw new Error("User Not Found")
        if (data.followerId.toString() === data.followingId.toString()) {
            throw new Error("Cant follow yourself")
        }

        const duplicate = await Follow.followCollection().findOne({
            followingId : data.followingId,
            followerId : data.followerId
        })
   
        if(duplicate) throw new Error("Cant Follow more than once")
        
        const follows = await Follow.followCollection().insertOne(data)
        return follows
    }

}

module.exports = Follow