import { useQuery } from "@apollo/client";
import { CSSProperties } from "react";
import { QueryGetShirtsByLeague, gqlGetShirtsByLeague } from "../../graphql/shirt";
import { RenderShirt, RenderShirtGrid } from ".";


interface ShirtListProps {
  leagueId: string,
}
export const LeagueShirtList = (props: ShirtListProps) => {

  const h1Styles: CSSProperties = {
    textAlign: "center"
  }

  const { data, loading } = useQuery<QueryGetShirtsByLeague>(gqlGetShirtsByLeague, {
    variables: {leagueId: props.leagueId},
  });

  if(loading) {
    return (
      <h1 style={h1Styles}>Loading Shirts</h1>
    );
  }

  if(!data || data.shirtsByLeague.length == 0) {
    return (
      <h1 style={h1Styles}>No Shirts found</h1>
    );
  }

  return ( 
    <>
      <h1 style={h1Styles}>Shirt List</h1>
      <Renderer shirtsByLeague={data?.shirtsByLeague!}/>
    </>
  );
}


function Renderer({ shirtsByLeague: shirts }: QueryGetShirtsByLeague) {

  return (
    <RenderShirtGrid shirts={shirts}/>
  );
}
