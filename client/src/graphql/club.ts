import { gql } from "@apollo/client";
import { Club, League } from "./types";

type LeagueNoClubs = Omit<League, 'clubs'>
type ClubNoShirtsOrLeague = Omit<Club, 'shirts' | 'league'>
interface QueryClub extends ClubNoShirtsOrLeague {
	league: LeagueNoClubs,
}

export type QueryGetClubsWithLeagues = {
	allClubs: QueryClub[]
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
