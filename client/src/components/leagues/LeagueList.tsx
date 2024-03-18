import { useQuery } from "@apollo/client";
import { QueryGetLeagues, gqlGetLeagues } from "../../graphql/league"; 
import { useOutlet } from "react-router-dom";
import { RenderLeagueGrid } from "./RenderLeagueGrid";

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
            <h1 className="text-4xl font-bold text-center mt-8">Choose a league</h1>
            <RenderLeagueGrid leagues={data?.allLeagues} />
        </>
    );
}
