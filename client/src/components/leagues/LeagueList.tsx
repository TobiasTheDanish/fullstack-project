import { useQuery } from "@apollo/client";
import { QueryGetLeagues, gqlGetLeagues } from "../../graphql/league"; 
import { Link, useOutlet } from "react-router-dom";

export const LeagueList = () => {
    const { data, loading } = useQuery<QueryGetLeagues>(gqlGetLeagues);
    const outlet = useOutlet();

    if(outlet) {
        return outlet
    }

    if(loading) {
        return (
            <h1>Loading Leagues</h1>
        );
    }

    return ( 
        <>
            <h1>League List</h1>
            <LeagueListRenderer allLeagues={data?.allLeagues!}/>
        </>
    );
}


function LeagueListRenderer({allLeagues: leagues}: QueryGetLeagues) {
    return (
        <div>
            {leagues.map(league => {
                return (
                    <Link key={league._id} to={`${league._id}`}>
                        <div>
                            <hr />
                            <h3>League: {league.name}</h3>
                            <p>Country: {league.country}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
