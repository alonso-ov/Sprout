import User from "../models/User.js";
import {
  GraphQLID,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} from "graphql";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = "secret-key";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

const TokenType = new GraphQLObjectType({
  name: "Token",
  fields: {
    token: { type: GraphQLString },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      loginUser: {
        type: TokenType,
        args: {
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (parent, args) => {
          const user = await User.findOne({ email: args.email }).exec();
          if (!user) {
            throw new Error("No such user found");
          }
          const valid = await bcrypt.compare(args.password, user.password);

          if (!valid) {
            throw new Error("Invalid password");
          }
          const token = jwt.sign({ userId: user._id }, SECRET, {
            expiresIn: "1h",
          });
          console.log(token);
          return { token };
        },
      },
      authenticateUser: {
        type: GraphQLBoolean,
        args: {
          token: { type: new GraphQLNonNull(GraphQLString) },
        }
      }
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      registerUser: {
        type: UserType,
        args: {
          firstname: { type: new GraphQLNonNull(GraphQLString) },
          lastname: { type: new GraphQLNonNull(GraphQLString) },
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: async (parent, args) => {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(
            args.password,
            saltRounds,
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
          console.log(hashedPassword);
          const user = new User({
            firstname: args.firstname,
            lastname: args.lastname,
            email: args.email,
            password: hashedPassword,
          });

          return user.save();
        },
      },
    },
  }),
});

export default schema;
