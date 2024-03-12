import { gql } from "@apollo/client";

export type QueryGetLeagues = {
    allLeagues: {_id: string, name: string, country: string}[]
}

export const gqlGetLeagues = gql`#graphql
query getLeagues {
  allLeagues {
    _id
    name
    country
  }
}

`