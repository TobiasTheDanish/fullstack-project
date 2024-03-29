import { useQuery } from "@apollo/client";
import { QueryGetClubsWithLeagues, gqlGetClubsWithLeagues } from "../../graphql/club";
import { ChangeEvent, Dispatch, SelectHTMLAttributes, SetStateAction, forwardRef } from "react";
import { Club } from "../../graphql/types";

interface Props {
  setClub?: Dispatch<SetStateAction<Partial<Omit<Club, 'league'>>>>
}


export const ClubSelect = forwardRef<HTMLSelectElement, Props>(function ClubSelect({required, setClub}: SelectHTMLAttributes<HTMLSelectElement> & Props, ref) {
  const { data, loading } = useQuery<QueryGetClubsWithLeagues>(gqlGetClubsWithLeagues);
  
  if (loading) return null;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (setClub) {
      const selected = data?.allClubs.find((l) => l._id == e.target.value);
      setClub(selected!);
    }
  }
  

  return (
    <select className="border rounded-md border-gray-800" required={required} ref={ref} onChange={handleChange}>
      <option value="" className="text-center">Not selected</option>
      {data?.allClubs.map(c => {
        return (
          <option key={c._id} value={c._id} className="text-center" >{c.name}</option>
        )
      })
      }
    </select>
  );
}
);
