// buildSchema should result in faster result:
// seee: https://stackoverflow.com/questions/67435529/what-is-the-difference-between-gql-and-buildschema

import { buildSchema } from 'graphql'
// import { gql } from "apollo-server-express";

const schema = buildSchema(`
type Result {
  result: String!
}


input AuthSignupInput {
  email: String!
  pass: String!
  firstname: String!
  lastname: String!
}

input AuthLoginInput {
  email: String!
  pass: String!
}

type AuthLogin {
  firstname: String
  token: String
  refreshToken: String
}

type Query {
  version: Result
}

type Mutation {
  authSignup(input: AuthSignupInput): Result
  authLogin(input: AuthLoginInput): AuthLogin
}
`)

export default schema
