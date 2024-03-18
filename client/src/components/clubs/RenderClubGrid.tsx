import { RenderClub } from ".";
import { Club } from "../../graphql/types";


interface RenderClubGridProps {
    clubs: Club[];
}

export const RenderClubGrid = ({ clubs }: RenderClubGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-12">
            {clubs.map((club) => (
                <RenderClub key={club._id} club={club}/>
            ))}
        </div>
    );
}