const { database } = require("../config/mongo")

class Post{

    static postCollection(){
        return database.collection("posts")
    }

    static async findAll(){
        const posts = await Post.postCollection().find().toArray()
        return posts
    }

    static async createOne(data){
        console.log(data), "<<<<<<<<<<<<";
        const newPost = await Post.postCollection().insertOne(data)
        return newPost
    }

    


}

module.exports = Post