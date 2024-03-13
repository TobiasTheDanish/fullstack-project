import { Link } from "react-router-dom";
import { Club, League } from "../../graphql/types";

type PartialClub = Partial<Omit<Club, "league"> > & {league?: Partial<League>}

export function ClubRenderer({club, asLink}: {club: PartialClub, asLink?: boolean}) {
  if (asLink) {
    return (
      <Link to={`/clubs/${club._id!}`} >
        <ClubRenderer club={club} />
      </Link>
    );
  }

  if (!club) {
    console.log("Cannot render an undefined club");
    return null;
  }

  return (
    <div>
      <hr />
      {club.name && <h3>Name: {club.name}</h3>}
      {club.league && (
        <>
          {club.league.name && <p>League: {club.league.name}</p>}
          {club.league.country && <p>Country: {club.league.country}</p>}
        </>
      )}
    </div>
  );
}
