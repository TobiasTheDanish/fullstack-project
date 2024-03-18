import { useQuery } from "@apollo/client";
import { CSSProperties } from "react";
import { QueryGetShirtsByClub, gqlGetShirtsByClub } from "../../graphql/shirt";
import { RenderShirtGrid } from ".";

interface ShirtListProps {
  clubId: string,
}
export const ClubShirtList = (props: ShirtListProps) => {
  const { data, loading } = useQuery<QueryGetShirtsByClub>(gqlGetShirtsByClub, {
    variables: {clubId: props.clubId},
  });


  if(loading) {
    return (
      <h1 className="text-center">Loading Shirts</h1>
    );
  }

  if(!data || !data.shirtsByClub || data.shirtsByClub.length == 0) {
    return (
      <h1 className="text-center">No Shirts found</h1>
    );
  }

  return ( 
    <>
      <h1 className="text-4xl font-bold text-center mt-8">Shirt List</h1>
      <RenderShirtGrid shirts={data.shirtsByClub}/>
    </>
  );
}