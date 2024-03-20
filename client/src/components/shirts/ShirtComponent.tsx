import { useParams } from "react-router-dom";
import { RenderShirt } from ".";
import { useMutation, useQuery } from "@apollo/client";
import { QueryGetShirtById, gqlGetShirtById } from "../../graphql/shirt";
import { BidList } from "../bids/BidList";
import { CreateBidForm } from "../bids/CreateBid";
import { QuerySignedInUser, gqlSignedInUser } from "../../graphql/user";
import { BidRenderer } from "..";
import { gqlAcceptBid, gqlBid, gqlDeclineBid } from "../../graphql/bid";
import { useState } from "react";

export function ShirtComponent() {
  const {id} = useParams();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [acceptBid] = useMutation<{_id: string}>(gqlAcceptBid);
  const [declineBid] = useMutation<{_id: string}>(gqlDeclineBid);
  const {data: userData} = useQuery<QuerySignedInUser>(gqlSignedInUser)
  const {data, loading, error} = useQuery<QueryGetShirtById>(gqlGetShirtById, {
    variables: {
      shirtId: id,
    },
  });

  const handleAccept = async (bidId: string) => {
    try {
      await acceptBid({
        variables: {
          bidId: bidId,
        }
      })

      location.reload();
    } catch(err) {
      console.error(err);
      setErrorMsg("An error occurred when accepting bid. " + err);
    }
  }

  const handleDecline = async (bidId: string) => {
    try {
      await declineBid({
        variables: {
          bidId: bidId,
        }
      });

      location.reload();
    } catch (err) {
      console.error(err);
      setErrorMsg("An error occurred when declining bid. " + err);
    }
  }

  const bidSort = (a: gqlBid, b: gqlBid): number => {
    return b.amount - a.amount;
  };

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-12">
      <RenderShirt shirt={data?.shirtById!}/>
      <div className="flex flex-col bg-white h-fit w-fit mx-auto rounded-lg shadow-md p-6 mb-4 gap-12">
        {errorMsg && <h2 className="text-red-500">{errorMsg}</h2>}
        {data.shirtById.seller?._id != userData?.signedInUser._id ? (
          <>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-xl text-start">Highest bids</h3>
              <div className="flex">
                <BidList bids={data.shirtById.activeBids!} maxBids={3}/>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-xl text-start">Make a bid</h3>
              <CreateBidForm shirtId={id!} minAmount={data?.shirtById.minPrice}/>
            </div>
          </>
          ) : (
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-xl text-start">All bids</h3>
              <div className="flex flex-col gap-2">
                {[...data.shirtById.activeBids].sort(bidSort).map(b => (
                  <BidRenderer className="border-b" key={b._id} bid={b}>
                    {b.accepted ? (
                    <p className="mt-2 text-green-500">This bid has been accepted</p>
                    ) : (
                    <div className="flex gap-2 mt-2">
                      <div className="border rounded w-fit px-4 py-2 cursor-pointer border-2 border-green-500 hover:bg-green-100 transition-colors ease-in" onClick={() => handleAccept(b._id)}>
                        Accept
                      </div>
                      <div className="border rounded w-fit px-4 py-2 cursor-pointer border-2 border-red-500 hover:bg-red-100 transition-colors ease-in" onClick={() => handleDecline(b._id)}>
                        Decline
                      </div>
                    </div>
                    )
                    }
                  </BidRenderer>
                )
                )}
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
