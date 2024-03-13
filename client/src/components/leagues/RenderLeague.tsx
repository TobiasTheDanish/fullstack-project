import { League } from "../../graphql/types";

type leagueProps = { league: Partial<League> };

export const RenderLeague = ({ league }: leagueProps) => {
    
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col justify-center">
            
        </div>
    )
}