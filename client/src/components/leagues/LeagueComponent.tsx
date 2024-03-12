import { useParams } from "react-router-dom";
import { ClubList, ShirtList } from "..";

export function LeagueComponent() {
  const {id} = useParams();

  return (
    <div>
      <ClubList leagueId={id} />
      <hr/>
      <ShirtList type="league" id={id} />
    </div>
  );
}
