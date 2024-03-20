import { gql } from "@apollo/client";

export type gqlBid = {
  _id: string,
  amount: number,
  expiryDate: string,
  accepted: boolean,
  declined: boolean,
}


export type QueryGetBidsByShirt = {
  bidsByShirtId: gqlBid[];
}

export const gqlGetBidsByShirtId = gql`#graphql
query BidsByShirtId($shirtId: ID) {
  bidsByShirtId(shirtId: $shirtId) {
    _id
    amount
    expiryDate
    accepted
    declined
  }
}
`

export const gqlCreateBid = gql`#graphql
mutation CreateBid($input: CreateBidInput) {
  createBid(input: $input) {
    _id
  }
}
`

export const gqlAcceptBid = gql`#graphql
mutation AcceptBid($bidId: ID!) {
  acceptBid(bidId: $bidId) {
    _id
  }
}
`

export const gqlDeclineBid = gql`#graphql
mutation DeclineBid($bidId: ID!) {
  declineBid(bidId: $bidId) {
    _id
  }
}
`
