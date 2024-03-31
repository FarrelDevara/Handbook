const { hashPassword, comparePassword } = require('../helpers/byrcrpt');
const { signToken } = require('../helpers/jwt');
const Follow = require('../model/Follow');
const User = require('../model/User');

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    _id: ID
    name: String
    username: String!
    email: String!
    password: String
    FollowerData: [UserDetail]
    FollowingData: [UserDetail]
  }

  type UserDetail{
    _id:ID
    name: String
    username: String
    email: String
  }

  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
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
    searchByUsername(username: String): [User]
    findUserByUsername(username: String): User 
    findUserByEmail(email: String): User 
    findUserById(_id: ID): User
    getDetail(_id: ID) : User

  }
  
  type Mutation {
    Register(name: String,username: String,email: String,password: String) : User
    Login(email: String, password: String) : Token
    Follow(followingId: ID) : Follow
  }
`;

const resolvers = {
  Query: {
    // User
    users: async () => {
      const users = await User.findAll();
      return users;
    },
    findUserByUsername: async (_, args) => {
      // console.log(args);
      const user = await User.findByUsername(args.username);
      return user;
    },
    searchByUsername: async (_, args) => {
      // console.log(args);
      const user = await User.searchByUsername(args.username);
      return user;
    },
    findUserByEmail: async (_, args) => {
      // console.log(args);
      const user = await User.findByEmail(args.email);
      return user;
    },
    findUserById: async (_, args) => {
      console.log(args);
      const user = await User.findUserById(args._id);
      return user;
    },
    getDetail: async (_, args, contextValue) => {
      const dataUser = contextValue.auth();
      console.log(dataUser);
      let user;
      if (!args._id) {
        user = await User.getDetail(dataUser.id)
      }else{
         user = await User.getDetail(args._id);
      }
      console.log(user);
      return user;
    },
    // Post
  },
  Mutation: {
    Register: async (_, args) => {
      email = args.email.split('@');
      if (email.length > 1) {
        if (email[1].split('.').length <= 1) {
          throw new Error('Invalid Email Format');
        }
      } else {
        throw new Error('Invalid Email Format');
      }

      const findEmail = await User.findByEmail(args.email);
      if (findEmail) throw new Error('Email must be unique');

      const findUsername = await User.findByUsername(args.username);
      if (findUsername) throw new Error('Username must be unique');

      if (args.password.length < 5) throw new Error('Password length must be 5 or more');

      /////////////////////////////

      const password = hashPassword(args.password);
      const newUser = {
        name: args.name,
        username: args.username,
        email: args.email,
        password,
      };

      const result = await User.createOne(newUser);

      newUser._id = result.insertedId;

      return newUser;
    },

    Login: async (_, args) => {
      if (!args.email) throw new Error('Email cannot be null');
      if (!args.password) throw new Error('Password cannot be null');

      const findUser = await User.findByEmail(args.email);
      if (!findUser) throw new Error('Invaid email/password');

      const compare = comparePassword(args.password, findUser.password);
      if (!compare) throw new Error('Invaid email/password');
      /////////////////////////////

      const payload = {
        id: findUser._id,
        email: findUser.email,
      };

      const token = {
        access_token: signToken(payload),
      };

      return token;
    },

    Follow: async (_, args, contextValue) => {
      const payload = await contextValue.auth();
      //   console.log(payload);

      const newFollow = {
        followingId: args.followingId,
        followerId: payload.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await Follow.createOne(newFollow);

      newFollow._id = result.insertedId;

      return newFollow;
    },
  },
};

module.exports = { typeDefs, resolvers };
