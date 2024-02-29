import { useQuery } from "@apollo/client";
import { QueryGetLeagues, gqlGetLeagues } from "../graphql/league"; 

const LeagueList = () => {

    const { data, loading } = useQuery<QueryGetLeagues>(gqlGetLeagues);

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
                    <div key={league._id}>
                        <h3>League: {league.name}</h3>
                        <p>Country: {league.country}</p>
                    </div>
                )
            })}
        </div>
    )
}

 
export default LeagueList;