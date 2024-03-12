import { ClubsByLeagueList } from "./ClubsByLeagueList";
import { AllClubsList } from "./AllClubsList";
import { useOutlet } from "react-router-dom";

interface Props {
  leagueId?: string,
}

export function ClubList({leagueId}: Props) {
  const outlet = useOutlet();

  if (outlet) {
    return outlet;
  }

  if (leagueId) {
    return (
      <ClubsByLeagueList leagueId={leagueId}/>
    );
  }

  return (
    <AllClubsList />
  );
};

