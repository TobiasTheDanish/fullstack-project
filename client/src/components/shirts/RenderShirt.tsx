import { Link } from "react-router-dom";
import { Shirt } from "../../graphql/types";

type shirtProps = { shirt: Partial<Shirt>, asLink?: boolean };

export const RenderShirt = ({ shirt, asLink }: shirtProps) => {
  if(asLink){
    return(
      <Link to={`/shirts/${shirt._id}`}>
      <RenderShirt shirt={shirt}/>
      </Link> 
         )
  }
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col justify-center">
      {shirt.imageUrls && <img src={shirt.imageUrls[0]} className="w-1/3 md:w-1/2 lg:w-2/3 mx-auto"/>}
      {shirt.title && <h3 className="text-xl font-semibold mb-2"><span>{shirt.title}</span></h3>}
      {shirt.playerName && (
        <h3 className="text-xl font-semibold mb-2">
          Player: <span className="text-blue-500">{shirt.playerName}</span>
        </h3>
      )}
      {shirt.playerNumber && (
        <p className="text-sm text-gray-600">
          Number: <span className="font-bold">#{shirt.playerNumber}</span>
        </p>
      )}

      {shirt.minPrice && (
        <p className="text-lg font-bold mt-2">
        <span className="text-green-500">${shirt.minPrice}</span>
        </p>
      )}
      {shirt.price && (
        <p className="text-lg font-bold mt-2">Buy Now:
        <span className="text-green-500"> ${shirt.price}</span>
        </p>
      )}
      {shirt.description && (
        <p className="text-sm text-gray-700 mt-2">
        <span>{shirt.description}</span>
        </p>
      )}
      {shirt.condition && (
        <p className="text-sm text-gray-700 mt-2">
          Condition: <span>{shirt.condition}</span>
        </p>
      )}
      {shirt.seller && (
        <p className="text-sm text-gray-700 mt-2">
          Seller:
          <span className="text-blue-500"> {shirt.seller?.username}</span>
        </p>
      )}
      {shirt.year && (
        <p className="text-sm text-gray-700 mt-2">
        Year: <span>{shirt.year}</span>
      </p>
      )}
    </div>
  );
};
