import { Shirt } from "../../graphql/types";

interface shirtProps {
    shirt: Shirt;
}

export const RenderShirt = ({shirt}: shirtProps) => {

    return ( 
        <div>
            <h1 className="text-sky-400">HEJ</h1>
        <h3 className="text-red-500">
          Player: <span>{shirt.playerName}</span>
        </h3>
        <p>
          Number: <span>#{shirt.playerNumber}</span>
        </p>
        <p>
          Price: <span>{shirt.price}</span>
        </p>
        <p>
          Details: <span>{shirt.description}</span>
        </p>
        <p>
          Condition: <span>{shirt.condition}</span>
        </p>
        <p>
          Seller: <span>{shirt.seller?.username}</span>
        </p>
      </div>
     );
}
 
