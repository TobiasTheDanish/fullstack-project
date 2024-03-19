import React from 'react';
import { Shirt } from "../../graphql/types";
import { RenderShirtGrid } from '.';

interface RecentlyAddedShirtsProps {
  shirts: Shirt[];
}

const RecentlyAddedShirts: React.FC<RecentlyAddedShirtsProps> = ({ shirts }) => {

  const recentlyAddedShirts = shirts.slice(0, 4);

  return (
    <RenderShirtGrid shirts={recentlyAddedShirts}/>
  );
};

export default RecentlyAddedShirts;
