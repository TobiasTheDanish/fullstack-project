import { useQuery } from "@apollo/client";
import { CSSProperties, useEffect, useState } from "react";
import { QueryGetShirts, gqlGetShirts } from "../../graphql/shirt";
import { Shirt } from "../../graphql/types";
import { RenderShirtGrid } from ".";

export function AllShirtList({ shirts }: {shirts?: Shirt[]}) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedShirts, setSortedShirts] = useState<Shirt[]>([]);

  const h1Styles: CSSProperties = {
    textAlign: "center"
  }

  const { data, loading } = useQuery<QueryGetShirts>(gqlGetShirts);

  useEffect(() => {
    if (shirts) {
      setSortedShirts(sortShirts(shirts, sortOrder));
    } else if (data?.allShirts) {
      setSortedShirts(sortShirts(data.allShirts, sortOrder));
    }
  }, [shirts, data, sortOrder]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as 'asc' | 'desc');
  };


  if(shirts) {
    return ( 
      <>
      <div>
        <label>Sort by:</label>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      <RenderShirtGrid shirts={sortedShirts}/>
      </>
    ); 
  }
  if(loading) {
    return (
      <h1 style={h1Styles}>Loading Shirts</h1>
    );
  }

  return ( 
    <>
      <div className="m-4">
        <label>Sort by <b>Buy now</b> Price: </label>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      <RenderShirtGrid shirts={sortedShirts}/>
    </>
  );
}

function sortShirts(shirts: Shirt[], sortOrder: 'asc' | 'desc') {
  return shirts.slice().sort((a: Shirt, b: Shirt) => {
    const priceA = parseFloat(a.price.toString()); 
    const priceB = parseFloat(b.price.toString()); 
    return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
  });
}