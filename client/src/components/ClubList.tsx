import { useQuery } from "@apollo/client";
import { QueryGetClubsWithLeagues, gqlGetClubsWithLeagues } from "../graphql/club";

export function ClubList() {
  const { data, loading } = useQuery<QueryGetClubsWithLeagues>(gqlGetClubsWithLeagues);

  if (loading) {
    return (
      <h1>Loading clubs</h1>
    );
  }

  return (
    <>
      <h1>List of clubs</h1>
      <ClubListRenderer allClubs={data?.allClubs!}/>
    </>
  );
};

type ClubListRendererProps = QueryGetClubsWithLeagues;
function ClubListRenderer({allClubs: clubs}: ClubListRendererProps) {

  return (
    <div>
      {clubs.map(club => {
        return (
          <div key={club._id}>
            <hr />
            <h3>Name: {club.name}</h3>
            <p>League: {club.league.name}</p>
            <p>Country: {club.league.country}</p>
          </div>
        )
      })
      }
    </div>
  )
}
