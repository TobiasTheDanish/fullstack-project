import { useQuery } from "@apollo/client";
import { ChangeEvent, Dispatch, SelectHTMLAttributes, SetStateAction, forwardRef } from "react";
import { QueryGetLeagues, gqlGetLeagues } from "../../graphql/league";
import { League } from "../../graphql/types";

interface Props {
  setLeague?: Dispatch<SetStateAction<Partial<Omit<League, 'clubs'>>>>
}

export const LeagueSelect = forwardRef<HTMLSelectElement, Props>(({required, setLeague}: SelectHTMLAttributes<HTMLSelectElement> & Props, ref) => {
  const { data, loading } = useQuery<QueryGetLeagues>(gqlGetLeagues);

  if (loading) return null;

  return (
    <select required={required} ref={ref} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
      if (setLeague) {
        const selected = data?.allLeagues.find((l) => l._id == e.target.value);
        setLeague(selected!);
      }
    }}>
      <option value="">Not selected</option>
      {data?.allLeagues.map(c => {
        return (
          <option key={c._id} value={c._id}>{c.name}</option>
        )
      })
      }
    </select>
  );
}
);
