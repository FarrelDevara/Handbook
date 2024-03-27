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
      const posts = await Post.postCollection().find().toArray();
      await redis.set('posts', JSON.stringify(posts));
      return posts;
    }
  }

  static async findById(id) {
    // console.log(id);
    const posts = await Post.postCollection().findOne({
      _id: new ObjectId(String(id)),
    });
    return posts;
  }

  static async createOne(data) {
    // console.log(data), "<<<<<<<<<<<<";
    const newPost = await Post.postCollection().insertOne(data);
    await redis.del("posts")
    return newPost;
  }

  static async createComment(data) {

    await this.postCollection.updateOne(data)
  }
}

module.exports = Post;
