import { gql } from "apollo-server-express";
import { userTypeDefs } from "./types/user";
import { userResolvers } from "./resolvers/user";

const rootTypeDefs = gql`
  scalar DateTime

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [rootTypeDefs, userTypeDefs];
export const resolvers = [userResolvers];
