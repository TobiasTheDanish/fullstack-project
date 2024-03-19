import { gqlBid } from "../../graphql/bid";

interface Props {
  bid: Partial<gqlBid>
}

export function BidRenderer({bid: b}: Props) {
  if (!b) {
    return null;
  }
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        {b.amount && <h3>Amount: {b.amount}</h3>}
        {b.expiryDate && <p>Expires: {new Date(parseInt(b.expiryDate!)).toLocaleString()}</p>}
      </div>
    </>
  );
}
