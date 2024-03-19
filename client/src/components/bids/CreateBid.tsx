import { useMutation } from "@apollo/client";
import { gqlCreateBid } from "../../graphql/bid";
import { FormEvent, useRef, useState } from "react";

interface Props {
  minAmount?: number,
  shirtId: string,
}

export function CreateBidForm({minAmount, shirtId}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [createBid, {error: mutationError}] = useMutation<{_id: string}>(gqlCreateBid);
  const amountRef = useRef<HTMLInputElement>(null);
  const expireRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!shirtId) {
      setError("No shirt id here");
      return;
    }
    setError("");
    let amount = null;
    let expireIn = null;

    try {
      amount = Number(amountRef.current?.value!);
      expireIn = Number(expireRef.current?.value!);
    } catch (e) {
      setError((e as Error).message);
      return;
    }

    if (minAmount && amount < minAmount) {
      setError(`This shirt has a minimum price of: ${minAmount}`);
      return;
    }

    if (expireIn < 1) {
      setError(`A bid cannot expire in less than 1 day`);
      return;
    }

    const expiryDate = (Date.now() + (expireIn * 86400000)).toString();

    await createBid({
      variables: {
        input: {
          shirtId: shirtId,
          amount: amount,
          expiryDate: expiryDate,
        },
      },
    });

    if (mutationError) {
      setError(mutationError.message);
      return;
    }

    location.reload();
  };

  return (
    <form className="px-4 self-start flex text-start flex-col items-center gap-4" onSubmit={handleSubmit}>
      {error && <h2>{error}</h2>}
      <div className="flex flex-col">
        <label className="self-start">Amount:</label>
        <input className="border rounded px-1" type="number" ref={amountRef} />
      </div>
      <div className="flex flex-col">
        <label className="self-start">Expires in (days):</label>
        <input className="border rounded px-1" type="number" ref={expireRef} />
      </div>
      <input className="border rounded w-fit px-4 py-2 cursor-pointer border-2 border-green-500 hover:bg-green-100 transition-colors ease-in" type="submit" value="Make bid" />
    </form>
  );
}
