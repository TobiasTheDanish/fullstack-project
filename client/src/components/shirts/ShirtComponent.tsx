import { useParams } from "react-router-dom";
import { RenderShirt } from ".";
import { useQuery } from "@apollo/client";
import { QueryGetShirtById, gqlGetShirtById } from "../../graphql/shirt";
import { BidList } from "../bids/BidList";

export function ShirtComponent() {
  const {id} = useParams();
  const {data, loading, error} = useQuery<QueryGetShirtById>(gqlGetShirtById, {
    variables: {
      shirtId: id,
    },
  });

  if (loading) {
    return (
      <h1>Loading shirt</h1>
    );
  }

  if (error) {
    return (
      <>
        <h1>Error fetching shirt</h1>
        <p>Error message: {error.message}</p>
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-12">
      <RenderShirt shirt={data?.shirtById!}/>
      <div>
        <BidList bids={data?.shirtById!.activeBids!} />
      </div>
    </div>
  );
}
