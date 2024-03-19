import { useParams } from "react-router-dom";
import { RenderShirt } from ".";
import { useQuery } from "@apollo/client";
import { QueryGetShirtById, gqlGetShirtById } from "../../graphql/shirt";
import { BidList } from "../bids/BidList";
import { CreateBidForm } from "../bids/CreateBid";
import { QuerySignedInUser, gqlSignedInUser } from "../../graphql/user";

export function ShirtComponent() {
  const {id} = useParams();
  const {data: userData} = useQuery<QuerySignedInUser>(gqlSignedInUser)
  const {data, loading, error} = useQuery<QueryGetShirtById>(gqlGetShirtById, {
    variables: {
      shirtId: id,
    },
  });

  if (loading && !userData) {
    return (
      <h1>Loading shirt</h1>
    );
  }

  if (error || data?.shirtById == null) {
    return (
      <>
        <h1>Error fetching shirt</h1>
        <p>Error message: {error ? error.message : "No shirt found"}</p>
      </>
    );
  }

  
  if (data.shirtById.seller?._id != userData?.signedInUser._id) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-12">
        <RenderShirt shirt={data?.shirtById!}/>
        <div className="flex flex-col bg-white h-fit w-fit mx-auto rounded-lg shadow-md p-6 mb-4 gap-12">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl text-start">Highest bids</h3>
            <div className="flex">
              <BidList bids={data?.shirtById.activeBids!} maxBids={3}/>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl text-start">Make a bid</h3>
            <CreateBidForm shirtId={id!} minAmount={data?.shirtById.minPrice}/>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <h1>You are the owner of this shirt</h1>
    );
  }
}
