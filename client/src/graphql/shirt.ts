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
      imageUrls
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
      createdAt
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
    imageUrls
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
    imageUrls
    seller {
      username
    }
    club {
      name
    }
  }
}
`

export interface CreatShirtInput {
  clubId: string,
  condition: string,
  description: string,
  imageUrls: string[],
  minPrice: number,
  playerName?: string,
  playerNumber?: number,
  price: number,
  title: string,
  year: string,
}

export const gqlCreateShirtMutation = gql`#graphql
mutation CreateShirt($input: CreateShirtInput) {
  createShirt(input: $input) {
    _id
    club {
      name
      league {
        name
        country
      }
    }
    title
    description
    imageUrls
    price
    year
  }
}
`
