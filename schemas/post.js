const { ObjectId } = require("mongodb");
const Post = require("../model/Post");

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
 
  type Post {
    _id: ID
    content: String!
    tags: [String]
    imgUrl: String
    authorId: ID!
    # comments: [Comments]
    likes: [Likes]
    createdAt: String
    updatedAt: String
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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getPost: [Post]
  }
  
  type Mutation {
    addPost(content: String,tags: [String],imgUrl: String) : Post
  }
`;


const resolvers = {
    Query: {
        getPost: async () => {
            const posts = await Post.findAll()
            return posts
        },
    },
    Mutation:{
        addPost: async (_,args, contextValue) => {
            const user = contextValue.auth()
            console.log(user);

            const data = {
                content : args.content,
                tags : args.tags,
                imgUrl : args.imgUrl,
                authorId : new ObjectId(String(user.id))
            }

            const posts = await Post.createOne(data)
            return posts
        },
    }
}

module.exports = { typeDefs, resolvers}