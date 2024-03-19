import { gql } from "@apollo/client";
import { Shirt, User } from "./types";
import { gqlBid } from "./bid";

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
      createdAt
    }
  }
`;

export type QueryGetShirtById = {
  shirtById: Shirt,
}

export const gqlGetShirtById = gql`#graphql
query ShirtById($shirtId: ID) {
  shirtById(shirtId: $shirtId) {
    title
    description
    imageUrls
    price
    minPrice
    playerName
    playerNumber
    seller {
      username
      _id
    }
    club {
      _id
      name
    }
    condition
    year
    activeBids {
      _id
      accepted
      declined
      amount
      expiryDate
    }
  }
}
`

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
