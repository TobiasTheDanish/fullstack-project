import { useParams } from "react-router-dom";
import { ClubRenderer, ShirtList } from "..";
import { useQuery } from "@apollo/client";
import { QueryGetClub, gqlGetClub } from "../../graphql/club";

export function ClubComponent() {
  const {id} = useParams();
  const {data, loading} = useQuery<QueryGetClub>(gqlGetClub, {
    variables: {clubId: id},
  });

  return (
    <div>
      {loading || !data ? (
        <h1>Loading</h1>
      ) : (
          <ClubRenderer club={data.clubById} />
        )}
      <hr/>
      <ShirtList type="club" id={id} />
    </div>
  );
}
