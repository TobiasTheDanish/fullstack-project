import { gqlBid } from "../../graphql/bid";
import { cn } from "../../lib/utils";

interface Props extends React.ComponentProps<'div'> {
  bid: Partial<gqlBid>
}

export function BidRenderer({bid: b, className, children}: Props) {
  if (!b) {
    return null;
  }
  return (
    <>
      <div className={cn("bg-white text-start py-2 px-4", className)}>
        {b.amount && <h3><b>Amount:</b> ${b.amount}</h3>}
        {b.expiryDate && <p><b>Expires:</b> {new Date(parseInt(b.expiryDate!)).toLocaleDateString()}</p>}
        {children}
      </div>
    </>
  );
}
