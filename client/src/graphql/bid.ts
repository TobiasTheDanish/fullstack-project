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
