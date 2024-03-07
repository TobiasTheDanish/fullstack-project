import { useQuery } from "@apollo/client";
import { QueryGetClubsWithLeagues, gqlGetClubsWithLeagues } from "../../graphql/club";
import { ClubRenderer } from "./ClubRenderer";

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

  return <ClubListRenderer allClubs={data.allClubs} />
}

type ClubListRendererProps = QueryGetClubsWithLeagues;
function ClubListRenderer({allClubs: clubs}: ClubListRendererProps) {

  return (
    <>
      <h1>List of clubs</h1>
      <div>
        {clubs.map(club => {
          return (
            <ClubRenderer key={club._id} club={club} asLink />
          )
        })
        }
      </div>
    </>
  )
}

