import { useQuery } from "@apollo/client";
import { QueryGetClubsWithLeagues, gqlGetClubsWithLeagues } from "../../graphql/club";
import { SelectHTMLAttributes, forwardRef } from "react";

export const ClubSelect = forwardRef<HTMLSelectElement>(function ClubSelect({required}: SelectHTMLAttributes<HTMLSelectElement>, ref) {
  const { data, loading } = useQuery<QueryGetClubsWithLeagues>(gqlGetClubsWithLeagues);

  if (loading) return null;

  return (
    <select required={required} ref={ref}>
      <option value="">Not selected</option>
      {data?.allClubs.map(c => {
        return (
          <option key={c._id} value={c._id}>{c.name}</option>
        )
      })
      }
    </select>
  );
}
);
