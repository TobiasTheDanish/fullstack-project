import { useQuery } from "@apollo/client";
import { CSSProperties } from "react";
import { QueryGetShirtsByLeague, gqlGetShirtsByLeague } from "../../graphql/shirt";


interface ShirtListProps {
  leagueId: string,
}
export const LeagueShirtList = (props: ShirtListProps) => {

  const h1Styles: CSSProperties = {
    textAlign: "center"
  }

  const { data, loading } = useQuery<QueryGetShirtsByLeague>(gqlGetShirtsByLeague, {
    variables: {leagueId: props.leagueId},
  });

  if(loading) {
    return (
      <h1 style={h1Styles}>Loading Shirts</h1>
    );
  }

  if(!data || data.shirtsByLeague.length == 0) {
    return (
      <h1 style={h1Styles}>No Shirts found</h1>
    );
  }

  return ( 
    <>
      <h1 style={h1Styles}>Shirt List</h1>
      <Renderer shirtsByLeague={data?.shirtsByLeague!}/>
    </>
  );
}


function Renderer({ shirtsByLeague: shirts }: QueryGetShirtsByLeague) {

  const containerStyles = {
    fontWeight: '10px',
  };

  const paragraphStyles = {
    fontWeight: 'bold',
  };

  const spanStyles = {
    fontWeight: 'normal',
  };

  return (
    <div style={containerStyles}>
      {shirts.map((shirt) => (
        <div key={shirt._id}>
          <hr />
          <h3>
            Player: <span style={spanStyles}>{shirt.playerName}</span>
          </h3>
          <p style={paragraphStyles}>
            Number: <span style={spanStyles}>#{shirt.playerNumber}</span>
          </p>
          <p style={paragraphStyles}>
            Price: <span style={spanStyles}>{shirt.price}</span>
          </p>
          <p style={paragraphStyles}>
            Details: <span style={spanStyles}>{shirt.description}</span>
          </p>
          <p style={paragraphStyles}>
            Condition: <span style={spanStyles}>{shirt.condition}</span>
          </p>
          <p style={paragraphStyles}>
            Seller: <span style={spanStyles}>{shirt.seller?.username}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
