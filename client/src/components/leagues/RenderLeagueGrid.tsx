import { League } from "../../graphql/types";
import { RenderLeague } from ".";

interface RenderLeagueGridProps {
    leagues: League[];
}

export const RenderLeagueGrid = ({ leagues }: RenderLeagueGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-12">
            {leagues.map((league) => (
                <RenderLeague key={league._id} league={league}/>
            ))}
        </div> 
    );
}