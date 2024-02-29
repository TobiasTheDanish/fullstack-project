import { gql } from "@apollo/client";
import { Shirt } from "./types";

export type QueryGetShirts = {
  allShirts: Shirt[];
};

export const gqlGetShirts = gql`
  #graphql
  query allShirts {
    allShirts {
      _id
      title
      description
      condition
      year
      club {
        name
      }
      seller {
        username
      }
      playerName
      playerNumber
      price
      minPrice
    }
  }
`;
