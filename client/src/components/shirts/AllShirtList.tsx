import { useQuery } from "@apollo/client";
import { CSSProperties } from "react";
import { QueryGetShirts, gqlGetShirts } from "../../graphql/shirt";

export function AllShirtList() {

  const h1Styles: CSSProperties = {
    textAlign: "center"
  }

  const { data, loading } = useQuery<QueryGetShirts>(gqlGetShirts);

  if(loading) {
    return (
      <h1 style={h1Styles}>Loading Shirts</h1>
    );
  }

  return ( 
    <>
      <h1 style={h1Styles}>Shirt List</h1>
      <Renderer allShirts={data?.allShirts!}/>
    </>
  );
}


function Renderer({ allShirts: shirts }: QueryGetShirts) {

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
