import { useQuery } from "@apollo/client";
import { CSSProperties } from "react";
import { QueryGetShirtsByClub, gqlGetShirtsByClub } from "../../graphql/shirt";

interface ShirtListProps {
  clubId: string,
}
export const ClubShirtList = (props: ShirtListProps) => {
  const { data, loading } = useQuery<QueryGetShirtsByClub>(gqlGetShirtsByClub, {
    variables: {clubId: props.clubId},
  });

  const h1Styles: CSSProperties = {
    textAlign: "center"
  }

  if(loading) {
    return (
      <h1 style={h1Styles}>Loading Shirts</h1>
    );
  }

  if(!data || !data.shirtsByClub || data.shirtsByClub.length == 0) {
    return (
      <h1 style={h1Styles}>No Shirts found</h1>
    );
  }

  return ( 
    <>
      <h1 style={h1Styles}>Shirt List</h1>
      <Renderer shirtsByClub={data.shirtsByClub}/>
    </>
  );
}


function Renderer({ shirtsByClub: shirts }: QueryGetShirtsByClub) {

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
