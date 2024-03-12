import { gql } from "@apollo/client";
import { Club, League } from "./types";

type LeagueNoClubs = Omit<League, 'clubs'>
type ClubNoShirtsOrLeague = Omit<Club, 'shirts' | 'league'>
interface QueryClub extends ClubNoShirtsOrLeague {
  league: LeagueNoClubs,
}

export type QueryGetClubsWithLeagues = {
  allClubs: QueryClub[],
};
export const gqlGetClubsWithLeagues = gql`#graphql
query getClubsWithLeagues {
  allClubs {
    _id
    name
    createdAt
    league {
      _id
      country
      createdAt
      name
    }
  }
}
`

export type QueryGetClubsByLeague = {
  allClubsByLeague: ClubNoShirtsOrLeague[],
}
export const gqlGetClubsByLeague = gql`#graphql
query AllClubsByLeague($leagueId: ID) {
  allClubsByLeague(leagueId: $leagueId) {
    _id
    name
    createdAt
  }
}
`
export type QueryGetClub = {
  clubById: {
    name: string,
    league: {
      name: string,
      country: string,
    }
  },
};
export const gqlGetClub = gql`#graphql
query ClubById($clubId: ID) {
  clubById(clubId: $clubId) {
    name
    league {
      name
      country
    }
  }
}
`
