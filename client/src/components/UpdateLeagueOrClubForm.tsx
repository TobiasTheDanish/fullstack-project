import { useEffect, useRef, useState } from "react"
import { ClubSelect, ImageUpload } from ".";
import { LeagueSelect } from "./leagues/LeagueSelect";

export function UpdateLeagueOrClubForm() {
  const typeSelectRef = useRef<HTMLSelectElement>(null);
  const selectorRef = useRef<HTMLSelectElement>(null);
  const [selectedType, setSelectedType] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const selected = typeSelectRef.current?.value! == "0" ? "League" : "Club";

    setSelectedType(selected);
    
  }, [typeSelectRef.current?.value]);

  const onUpdateHandler = () => {

  };
  
  return (
    <>
      <select ref={typeSelectRef}>
        <option>Select update type</option>
        <option value="0">League</option>
        <option value="1">Club</option>
      </select>
      { selectedType == "League" ? (
          <LeagueSelect ref={selectorRef} />
        ) : (
          <ClubSelect ref={selectorRef} />
        )
      }
      {image == "" ? <ImageUpload setImage={setImage}/> :
      <img src={image} />}
      <button onClick={onUpdateHandler}>Update</button>
    </>
  );
}
