import { League } from "../../graphql/types";
import { Link } from "react-router-dom"

type leagueProps = { league: Partial<League> };

export const RenderLeague = ({ league }: leagueProps) => {
    
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col justify-evenly">
            <Link to={`/leagues/${league._id}`} className="flex-grow flex flex-col gap-5">
            {league.imageUrl && <img src={league.imageUrl} alt="league image" className="w-1/3 md:w-1/2 lg:w-2/3 mx-auto my-auto"/>}
            {league.name && <h3 className="bottom-0 left-0 w-full text-center p-4 rounded bg-gray-800 text-white">{league.name}</h3>}
            </Link>
        </div>
    )
}
