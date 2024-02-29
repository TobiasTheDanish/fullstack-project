import { useQuery } from "@apollo/client";
import { QueryGetShirts, gqlGetShirts } from "../graphql/shirt"; 

const ShirtList = () => {

    const { data, loading } = useQuery<QueryGetShirts>(gqlGetShirts);

    if(loading) {
        return (
            <h1>Loading Shirts</h1>
        );
    }

    return ( 
        <>
            <h1>Shirt List</h1>
            <ShirtListRenderer allShirts={data?.allShirts!}/>

        </>
     );
}


function ShirtListRenderer({allShirts: shirts}: QueryGetShirts) {
    return (
        <div>
            {shirts.map(shirt => {
                
                return (
                    <div key={shirt._id}>
                        <hr />
                        <h3>Player: {shirt.playerName}</h3>
                        <p>Number: #{shirt.playerNumber}</p>
                        <h4>Price: {shirt.price}</h4>
                        <p>{shirt.description}</p>
                        <p>Condition: {shirt.condition}</p>
                        <p>Seller: {shirt.seller?.username}</p>
                    </div>
                )
            })}
        </div>
    )
}

 
export default ShirtList;