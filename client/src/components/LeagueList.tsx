import { useQuery } from "@apollo/client";
import { QueryGetLeagues, gqlGetLeagues } from "../graphql/league"; 

export const LeagueList = () => {

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
                        <hr />
                        <h3>League: {league.name}</h3>
                        <p>Country: {league.country}</p>
                    </div>
                )
            })}
        </div>
    )
}
