const { hashPassword } = require("../helpers/byrcrpt");
const User = require("../model/User");

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

  type Follow {
    _id: ID
    followingId: ID
    follewerId: ID
    createdAt: String
    updatedAt: String
  }
  
  type Token {
    access_token: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
    findUserByUsername(username: String): User 
    findUserByEmail(email: String): User 
    findUserById(_id: ID): User

  }
  
  type Mutation {
    Register(name: String,username: String,email: String,password: String) : User
    Login(email: String, password: String) : Token
    Follow(followingId: ID, follewerId: ID) : Follow
  }
`;

const resolvers = {
    Query: {
      // User
        users: async () => {
            const users = await User.findAll()
            return users
        },
        findUserByUsername: async(_,args) =>{
            // console.log(args);
            const user = await User.findByUsername(args.username)
            return user
        },
        findUserByEmail: async(_,args) =>{
          // console.log(args);
          const user = await User.findByEmail(args.email)
          return user
        },
        findUserById: async(_,args) =>{
          // console.log(args);
          const user = await User.findByEmail(args.id)
          return user
        },
      // Post
       
      
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
        Follow: async(_,args,contextValue) =>{
          contextValue.auth()
          
          console.log(args);
        }
        
    }
  };

module.exports = { typeDefs, resolvers}