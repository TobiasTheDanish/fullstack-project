import { useQuery } from "@apollo/client";
import { SelectHTMLAttributes, forwardRef } from "react";
import { QueryGetLeagues, gqlGetLeagues } from "../../graphql/league";

export const LeagueSelect = forwardRef<HTMLSelectElement>(function LeagueSelect({required}: SelectHTMLAttributes<HTMLSelectElement>, ref) {
  const { data, loading } = useQuery<QueryGetLeagues>(gqlGetLeagues);

  if (loading) return null;

  return (
    <select required={required} ref={ref}>
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
