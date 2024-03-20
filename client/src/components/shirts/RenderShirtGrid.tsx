import { Shirt } from "../../graphql/types";
import { RenderShirt } from ".";

interface RenderShirtGridProps {
  shirts: Shirt[];
}

export const RenderShirtGrid = ({ shirts }: RenderShirtGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-12">
      {shirts.map((shirt) => (
        <RenderShirt asLink key={shirt._id} shirt={shirt} />
      ))}
    </div>
  );
};
