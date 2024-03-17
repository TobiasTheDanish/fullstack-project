import { gql } from "@apollo/client";

export type QueryGetLeagues = {
    allLeagues: {_id: string, name: string, imageUrl?: string, country: string}[]
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

export type MutationUpdateLeague = {
    updateLeague: {_id: string, name: string, imageUrl?: string, country: string}
}
export const gqlUpdateLeagueMutation = gql `#graphql
mutation UpdateLeague($leagueId: ID!, $input: UpdateLeagueInput) {
  updateLeague(leagueId: $leagueId, input: $input) {
    _id
    name
    country
  }
}
`;
