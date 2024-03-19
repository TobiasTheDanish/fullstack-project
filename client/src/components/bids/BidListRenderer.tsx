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
      <div className="bg-white border text-start rounded-lg py-2 px-4">
        {b.amount && <h3><b>Amount:</b> ${b.amount}</h3>}
        {b.expiryDate && <p><b>Expires:</b> {new Date(parseInt(b.expiryDate!)).toLocaleDateString()}</p>}
      </div>
    </>
  );
}
