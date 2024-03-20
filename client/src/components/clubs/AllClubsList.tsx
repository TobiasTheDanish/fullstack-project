import { useQuery } from "@apollo/client";
import { QueryGetClubsWithLeagues, gqlGetClubsWithLeagues } from "../../graphql/club";
import { RenderClubGrid } from ".";

export function AllClubsList() {
  const { data, loading } = useQuery<QueryGetClubsWithLeagues>(gqlGetClubsWithLeagues);

  if (loading) {
    return (
      <h1>Loading clubs</h1>
    );
  }

  if (!data || !data.allClubs || data.allClubs.length == 0) {
    return (
      <h1>No clubs found</h1>
    );
  }

  return <RenderClubGrid clubs={data.allClubs} />
}

