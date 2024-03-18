import { Link } from "react-router-dom";
import { Club, League } from "../../graphql/types";

type PartialClub = Partial<Omit<Club, "league"> > & {league?: Partial<League>}

export function RenderClub({club}: {club: PartialClub}) {

  if (!club) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col justify-center gap-5">
      <Link to={`/clubs/${club._id}`} className="flex-grow flex flex-col gap-5">
      {club.imageUrl && <img src={club.imageUrl} alt="club image" className="w-1/3 md:w-1/3 lg:w-1/3 mx-auto my-auto"/>}
      {club.name && <h3 className="bottom-0 left-0 w-full text-center p-4 rounded bg-gray-800 text-white">{club.name}</h3>}
      </Link>
    </div>
  );
}
