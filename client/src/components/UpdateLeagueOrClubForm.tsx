import { useEffect, useRef, useState } from "react"
import { ClubSelect, ImageUpload } from ".";
import { LeagueSelect } from "./leagues/LeagueSelect";
import { Club, League } from "../graphql/types";
import { useMutation } from "@apollo/client";
import { MutationUpdateLeague, gqlUpdateLeagueMutation } from "../graphql/league";
import { gqlUpdateClub } from "../graphql/club";

export function UpdateLeagueOrClubForm() {
  const typeSelectRef = useRef<HTMLSelectElement>(null);
  const [selectedLeague, setSelectedLeague] = useState<Partial<Omit<League, 'clubs' | 'createdAt'>>>({});
  const [selectedClub, setSelectedClub] = useState<Partial<Omit<Club, 'league' | 'createdAt' |  'shirts'>>>({});
  const [selectedType, setSelectedType] = useState("");
  const [image, setImage] = useState("");

  const [updateLeague, {data: leagueData, error: leagueError}] = useMutation<MutationUpdateLeague>(gqlUpdateLeagueMutation)
  const [updateClub, {data: clubData, error: clubError}] = useMutation(gqlUpdateClub);

  useEffect(() => {
    
  }, [typeSelectRef.current?.value]);

  const onUpdateHandler = async () => {
    if (selectedType == "League") {
      const updateInput = {
        name: selectedLeague.name!,
        country: selectedLeague.country!,
        imageUrl: image,
      }

      await updateLeague({
        variables: {
          leagueId: selectedLeague._id,
          input: updateInput,
        }
      });

      if (leagueData) {
        console.log("league updated");
        console.log(leagueData);
      } else {
        console.log("league not updated");
        console.log(leagueError);
      }
    } else {
      const updateInput = {
        name: selectedClub.name!,
        imageUrl: image,
      }

      await updateClub({
        variables: {
          clubId: selectedClub._id!,
          input: updateInput,
        }
      });
      if (clubData) {
        console.log("league updated");
        console.log(clubData);
      } else {
        console.log("league not updated");
        console.log(clubError);
      }
    }
  };
  
  return (
    <>
      <select ref={typeSelectRef} onChange={() => {
        const selected = typeSelectRef.current?.value! == "0" ? "League" : "Club";

        setSelectedType(selected);
      }}>
        <option>Select update type</option>
        <option value="0">League</option>
        <option value="1">Club</option>
      </select>
      { selectedType == "League" ? (
          <LeagueSelect setLeague={setSelectedLeague} />
        ) : (
          <ClubSelect setClub={setSelectedClub} />
        )
      }
      {image == "" ? <ImageUpload setImage={setImage}/> :
      <img src={image} />}
      <button onClick={onUpdateHandler}>Update</button>
    </>
  );
}
