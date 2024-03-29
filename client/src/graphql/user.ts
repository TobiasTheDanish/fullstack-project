import { gql } from "@apollo/client";
import { User } from "./types";

export type MutationSignIn = {
  userSignIn: string,
}

export const gqlSignIn = gql`#graphql
mutation UserSignIn($username: String!, $password: String!) {
  userSignIn(username: $username, password: $password)
}
`

export type QuerySignedInUser = {
  signedInUser: User,
}

export const gqlSignedInUser = gql`#graphql
query SignedInUser {
  signedInUser {
    _id
    username
    email
    placedBids {
      amount
      accepted
      declined
      _id
    }
    shirts {
      title
      description
      _id
    }
  }
}
`

export type MutationSignUp = {
  userSignUp: string,
}

export const gqlSignUp = gql`#graphql
  mutation Mutation($username: String!, $email: String!, $password: String!) {
  userSignUp(username: $username, email: $email, password: $password)
}

`
