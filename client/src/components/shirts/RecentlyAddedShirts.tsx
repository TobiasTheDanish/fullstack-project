import React from 'react';
import { Shirt } from "../../graphql/types";

interface RecentlyAddedShirtsProps {
  shirts: Shirt[];
}

const RecentlyAddedShirts: React.FC<RecentlyAddedShirtsProps> = ({ shirts }) => {

  const recentlyAddedShirts = shirts.slice(0, 4);

  return (
    <div>
      {recentlyAddedShirts.map((shirt) => (
        <div key={shirt._id}>
          <hr />
          <h3>Player: {shirt.playerName}</h3>
          <p>Number: #{shirt.playerNumber}</p>
          <p>Price: {shirt.price}</p>
          <p>Details: {shirt.description}</p>
          <p>Condition: {shirt.condition}</p>
          <p>Seller: {shirt.seller?.username}</p>
        </div>
      ))}
    </div>

  );
};

export default RecentlyAddedShirts;
