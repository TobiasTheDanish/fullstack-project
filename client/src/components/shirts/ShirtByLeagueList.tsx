import { useQuery } from "@apollo/client";
import { QueryGetShirtsByLeague, gqlGetShirtsByLeague } from "../../graphql/shirt";
import { RenderShirtGrid } from ".";


interface ShirtListProps {
  leagueId: string,
}
export const LeagueShirtList = (props: ShirtListProps) => {

  const { data, loading } = useQuery<QueryGetShirtsByLeague>(gqlGetShirtsByLeague, {
    variables: {leagueId: props.leagueId},
  });

  if(loading) {
    return (
      <h1 className="text-center">Loading Shirts</h1>
    );
  }

  if(!data || data.shirtsByLeague.length == 0) {
    return (
      <h1 className="text-center">No Shirts found</h1>
    );
  }

  return ( 
    <>
      <h1 className="text-4xl font-bold text-center mt-8">Shirt List</h1>
      <RenderShirtGrid shirts={data?.shirtsByLeague!}/>
    </>
  );
}

