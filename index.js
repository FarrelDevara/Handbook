const { ApolloServer } = require ('@apollo/server');
const { startStandaloneServer } = require ('@apollo/server/standalone');
const User = require('./model/User');
const { hashPassword, comparePassword } = require('./helpers/byrcrpt');
const { signToken } = require('./helpers/jwt');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    _id: ID
    name: String
    username: String!
    email: String!
    password: String!
  }

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
  }

  type Comments {
    content: String!
    username: String!
    createdAt: String
    updatedAt: String
  }

  type Likes{
    username: String!
    createdAt: String
    updatedAt: String
  }


  type Follow {
    _id: ID
    followingId: ID
    follewerId: ID
  }
  
  type Token {
    access_token: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
    findByUsername(username: String): User 
    findByEmail(email: String): User 
  }
  
  type Mutation {
    Register(name: String,username: String,email: String,password: String) : User
    Login(email: String, password: String) : Token
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        users: async () => {
            const users = await User.findAll()
            return users
        },
        findByUsername: async(_,args) =>{
            // console.log(args);
            const user = await User.findByUsername(args.username)
            return user
        },
        findByEmail: async(_,args) =>{
          // console.log(args);
          const user = await User.findByEmail(args.email)
          return user
      }
    },
    Mutation: {
        Register: async (_, args) =>{

            const findEmail = await User.findByEmail(args.email)
            if(findEmail) throw new Error("Email must be unique")

            const findUsername = await User.findByUsername(args.username)
            if(findUsername) throw new Error("Username must be unique")

            if(args.password.length < 5) throw new Error("Password length must be 5 or more")

            /////////////////////////////

            const password = hashPassword(args.password)
            const newUser = {
                name : args.name,
                username : args.username,
                email : args.email,
                password
            }

            const result = await User.createOne(newUser)

            newUser._id = result.insertedId

            return newUser
        },

        Login: async (_, args) =>{
          // console.log(args.username);
          const findEmail = await User.findByEmail(args.email)
          if(!findEmail) throw new Error("Invalid email/password")

          const password = comparePassword(args.password, findEmail.password)
          if(!password) throw new Error("Invalid email/password")

          const payload = {
            id : findEmail._id,
            email : findEmail.email,
          }
          
          const token = {
            access_token: signToken(payload)
          }

          return token
      }
    }
  };

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests

 (async () =>{
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
      });
    console.log(`🚀  Server ready at: ${url}`);
 })();
  
