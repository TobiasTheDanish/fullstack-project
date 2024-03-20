import { useQuery } from "@apollo/client";
import { QueryGetBidsByShirt, gqlBid, gqlGetBidsByShirtId } from "../../graphql/bid";
import { useEffect, useState } from "react";
import { BidRenderer } from "./BidListRenderer";

interface Props {
  shirtId?: string, 
  bids: gqlBid[] | null
  maxBids?: number,
}

function bidSort(a: gqlBid, b: gqlBid): number {
  return b.amount - a.amount;
}

export function BidList({shirtId, bids: startBids, maxBids}: Props) {
  const [bids, setBids] = useState<gqlBid[]>(startBids ? [...startBids].sort(bidSort).slice(0, maxBids) : []);
  const {data, loading} = useQuery<QueryGetBidsByShirt>(gqlGetBidsByShirtId, {
    variables: {
      shirtId: shirtId,
    }
  });

  useEffect(() => {
    if (shirtId) {
      if (loading) return;

      if (data) {
        let bidsToSet = data.bidsByShirtId.filter(b => !b.declined && Date.now() < new Date(parseInt(b.expiryDate)).getMilliseconds());

        bidsToSet = [...bidsToSet].sort(bidSort);

        if (maxBids && bidsToSet.length > maxBids) {
          bidsToSet = bidsToSet.slice(0, maxBids);
        }

        setBids(bidsToSet);
      }
    }
  }, [loading, data]);

  if (loading) {
    return (
      <p>Loading bids</p>
    );
  }

  if (bids.length == 0) {
    return (
      <div className="flex flex-col self-center mx-auto">
        <h2>Currently no bids</h2>
        <p>Make your bid now!</p>
      </div>
    )
  }

  return (
    <>
      {bids.map(b => <BidRenderer className="border rounded-lg" key={b._id} bid={b} />)}
    </>
  );
}
