const { ApolloServer } = require ('@apollo/server');
const { startStandaloneServer } = require ('@apollo/server/standalone');
const User = require('./model/User');

const { verifyToken } = require('./helpers/jwt');
const {typeDefs : typeDefsUser ,  resolvers : resolversUser} = require('./schemas/user')
const {typeDefs : typeDefsPost ,  resolvers : resolversPost} = require('./schemas/post')

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs: [typeDefsUser, typeDefsPost],
    resolvers: [resolversUser, resolversPost],
    introspection : true
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests

 (async () =>{
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },

        context: ({req,res}) =>{
          return{
            auth: () => {
    
              const auth = req.headers.authorization
              if(!auth) throw new Error("Invalid Token")

              const [Bearer, Token] = auth.split(" ")
              if(Bearer !== "Bearer") throw new Error("Invalid Token")

              const verify = verifyToken(Token)
          
              return verify
            }
          }
        }
      });
    console.log(`🚀  Server ready at: ${url}`);
 })();
  
