const { ObjectId } = require('mongodb');
const Post = require('../model/Post');
const User = require('../model/User');

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
 
  type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    comments: [Comments]
    likes: [Likes]
    createdAt: String
    updatedAt: String
    UserData: UserDetail
  }

  type Comments {
    content: String
    username: String
    createdAt: String
    updatedAt: String
  }

  type Likes{
    username: String
    createdAt: String
    updatedAt: String
  }

  type UserDetail{
    _id:ID
    name: String
    username: String
    email: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getPost: [Post]
    getPostById(_id: ID): Post
  }
  
  type Mutation {
    addPost(content: String,tags: [String],imgUrl: String) : Post
    addComment(content: String,postId: ID) : Comments
    addLikes(postId: ID) : Likes
  }
`;

const resolvers = {
  Query: {
    getPost: async () => {
      const posts = await Post.findAll();
      return posts;
    },
    getPostById: async (_, args) => {
      // console.log(args);
      const posts = await Post.findById(args._id);
      return posts;
    },
  },
  Mutation: {
    addPost: async (_, args, contextValue) => {
      const user = contextValue.auth();
      // console.log(user);

      const data = {
        content: args.content,
        tags: args.tags,
        imgUrl: args.imgUrl,
        authorId: new ObjectId(String(user.id)),
        comments: [],
        likes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const posts = await Post.createOne(data);
      return data;
    },

    addComment: async (_, args, contextValue) => {
      const user = contextValue.auth();
      // console.log(user);
      // console.log(args.postId);
      
      const find = await User.findUserById(user.id);
      // console.log(find);
      
      const data = {
        content: args.content,
        username: find.username,
        createdAt : new Date(),
        updatedAt : new Date()
      };

      const post = await Post.createComment(data, args.postId);
      return post;
    },

    addLikes: async (_, args, contextValue) => {
      const user = contextValue.auth();
      // console.log(user);
      // console.log(args.postId);
      
      const find = await User.findUserById(user.id);
      // console.log(find);
      
      const data = {
        username: find.username,
        createdAt : new Date(),
        updatedAt : new Date()
      };

      const post = await Post.createLikes(data, args.postId);
      return post;
    },
  },
};

module.exports = { typeDefs, resolvers };
