import { useQuery } from "@apollo/client";
import { QueryGetClubsByLeague, gqlGetClubsByLeague } from "../../graphql/club";
import { ClubRenderer } from "./ClubRenderer";

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


  return <Renderer allClubsByLeague={data.allClubsByLeague}/>
}

type ClubsByLeagueRendererProps = QueryGetClubsByLeague;
function Renderer({allClubsByLeague: clubs}: ClubsByLeagueRendererProps) {
  return (
    <>
      <h1>List of clubs</h1>
      <div>
        {clubs.map(club => {
          return (
            <ClubRenderer key={club._id} club={club} asLink />
          );
        })}
      </div>
    </>
  )
}
