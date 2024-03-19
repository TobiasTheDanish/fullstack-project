import { useQuery } from "@apollo/client";
import { QueryGetBidsByShirt, gqlBid, gqlGetBidsByShirtId } from "../../graphql/bid";
import { useEffect, useState } from "react";
import { BidRenderer } from "./BidListRenderer";

interface Props {
  shirtId?: string, 
  bids: gqlBid[] | null
  maxBids?: number,
}

export function BidList({shirtId, bids: startBids}: Props) {
  const [bids, setBids] = useState<gqlBid[]>(startBids ?? []);
  const {data, loading} = useQuery<QueryGetBidsByShirt>(gqlGetBidsByShirtId, {
    variables: {
      shirtId: shirtId,
    }
  });

  useEffect(() => {
    if (!shirtId || loading) return;

    if (data) {
      setBids(data.bidsByShirtId);
    }
  }, [loading, data]);

  if (loading) {
    return (
      <p>Loading bids</p>
    );
  }

  return (
    <>
      {bids.map(b => <BidRenderer key={b._id} bid={b} />)}
    </>
  );
}
