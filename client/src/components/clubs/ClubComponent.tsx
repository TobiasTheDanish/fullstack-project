import { useParams } from "react-router-dom";
import { ShirtList } from "..";

export function ClubComponent() {
  const {id} = useParams();

  return (
    <div>
      <h1>{id}</h1>
      <hr/>
      <ShirtList type="club" id={id} />
    </div>
  );
}
