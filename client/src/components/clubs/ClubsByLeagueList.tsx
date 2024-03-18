import { useQuery } from "@apollo/client";
import { QueryGetClubsByLeague, gqlGetClubsByLeague } from "../../graphql/club";
import { RenderClubGrid } from ".";

type ClubsByLeagueListProps = {leagueId: string};

export function ClubsByLeagueList({leagueId}: ClubsByLeagueListProps) {
  const { data, loading } = useQuery<QueryGetClubsByLeague>(gqlGetClubsByLeague, {
    variables: {leagueId: leagueId},
  });

  if (loading) {
    return (
      <h1>Loading clubs</h1>
    );
  }

  if (!data || !data.allClubsByLeague || data.allClubsByLeague.length == 0) {
    return (
      <h1>No clubs found</h1>
    );
  }


  return (
  <>
    <h1 className="text-4xl font-bold text-center mt-8">Select a club</h1>
    <RenderClubGrid clubs={data.allClubsByLeague}/>
  </>
    );
}