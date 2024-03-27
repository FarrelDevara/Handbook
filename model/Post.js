const { ObjectId } = require('mongodb');
const { database } = require('../config/mongo');
const redis = require('../config/redis');

class Post {
  static postCollection() {
    return database.collection('posts');
  }

  static async findAll() {
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
                as: 'UserData'
              }
            }, {
                $sort: {
                  createdAt: -1
                }
              }
          ]
    
        const cursor = Post.postCollection().aggregate(agg);
    
        const result = await cursor.toArray()
        await redis.set('posts', JSON.stringify(result));
        // console.log(result, "<<<<<<<<<<<<<<");
        return result;
    }
    
  }

  static async findById(id) {
    // console.log(id);
    const agg = [
        {
          $match: {
            _id: new ObjectId(String(id))
          }
        }, {
          $lookup: {
            from: 'users', 
            localField: 'authorId', 
            foreignField: '_id', 
            as: 'UserData'
          }
        }
      ]

    const cursor = Post.postCollection().aggregate(agg);

    const result = await cursor.toArray()
    // console.log(result.UserData, "<<<<<<<<<<<<<<");
    return result[0]
  }

  static async createOne(data) {
    const newPost = await Post.postCollection().insertOne(data);
    await redis.del("posts")
    return newPost;
  }

  static async createComment(data,postId) {

    const findPost = await Post.findById(postId)
    
    const newComment = await Post.postCollection().updateOne({
        _id : findPost._id
    },{$push : {comments : data}})
    await redis.del("posts")

    return data;
  }

  static async createLikes(data,postId,find) {

    const findPost = await Post.findById(postId)

    if (findPost.authorId.toString() === find._id.toString() ) {
        throw new Error("Already Liked This Post")
    }

    const newComment = await Post.postCollection().updateOne({
        _id : findPost._id
    },{$push : {likes : data}})
    await redis.del("posts")
    // console.log(findPost);
    return data;
  }

  
}

module.exports = Post;
