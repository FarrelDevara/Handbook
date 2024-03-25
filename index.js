const { ApolloServer } = require ('@apollo/server');
const { startStandaloneServer } = require ('@apollo/server/standalone');
const User = require('./model/User');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String
  }

  type Follow {
    _id: ID
    followingId: ID
    follwerId: ID
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
    findUser(username: String): User 
  }
  
  type Mutation {
    addUser(name: String,username: String,email: String,password: String) : User
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
        findUser: async(_,args) =>{
            console.log(args);
            const user = await User.findUser(args.username)
            return user
        }
    },
    Mutation: {
        addUser: async (_, args) =>{
            // console.log(args.username);
            const newUser = {
                name : args.name,
                username : args.username,
                email : args.email,
                password : args.password
            }

            const result = await User.createOne(newUser)

            newUser._id = result.insertedId

            return newUser
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
  
