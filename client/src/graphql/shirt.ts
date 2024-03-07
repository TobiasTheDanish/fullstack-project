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

export type QueryGetShirtsByLeague = {
  shirtsByLeague: Shirt[];
};

export const gqlGetShirtsByLeague = gql`#graphql
query ShirtsByLeague($leagueId: ID) {
  shirtsByLeague(leagueId: $leagueId) {
    _id
    playerName
    playerNumber
    price
    title
    description
    year
    condition
    seller {
      username
    }
    club {
      name
    }
  }
}
`

export type QueryGetShirtsByClub = {
  shirtsByClub: Shirt[];
};

export const gqlGetShirtsByClub = gql`#graphql
query ShirtsByClub($clubId: ID) {
  shirtsByClub(clubId: $clubId) {
    _id
    playerNumber
    playerName
    title
    description
    condition
    price
    year
    seller {
      username
    }
    club {
      name
    }
  }
}
`
