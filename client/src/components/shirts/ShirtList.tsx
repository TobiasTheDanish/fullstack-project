import { useOutlet } from "react-router-dom";
import { AllShirtList, ClubShirtList, LeagueShirtList } from "./";

type IdType = "club" | "league";

interface ShirtListProps {
  type?: IdType,
  id?: string,
}

export const ShirtList = (props: ShirtListProps | undefined) => {
  const outlet = useOutlet();

  if (outlet) {
    return outlet;
  }

  if (!props || (!props.type || !props.id)) {
    return <AllShirtList />;
  } else if (props.type == "league") {
    return <LeagueShirtList leagueId={props.id} />
  } else if(props.type == "club") {
    return <ClubShirtList clubId={props.id} />
  }
}
