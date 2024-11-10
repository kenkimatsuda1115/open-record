import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    nickname: String
    bio: String
    location: String
    website: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    getUser(username: String!): User
    getUserProfile(username: String!): User
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User
    updateProfile(username: String!, input: UpdateProfileInput!): User
    login(input: LoginInput!): AuthPayload
    forgetPassword(input: ForgetPasswordInput!): User
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateProfileInput {
    nickname: String
    bio: String
    location: String
    website: String
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input ForgetPasswordInput {
    username: String!
    email: String!
    newPassword: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;
