import { FormEvent, useEffect, useRef, useState } from "react";
import { ClubSelect, ImageUpload } from "..";
import { useMutation } from "@apollo/client";
import { CreatShirtInput, gqlCreateShirtMutation } from "../../graphql/shirt";

export function CreateShirtForm() {
  const [createShirtMutation] = useMutation(gqlCreateShirtMutation);
  const [latestImg, setLatestImg] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const minPriceRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const clubRef = useRef<HTMLSelectElement>(null);
  const conditionRef = useRef<HTMLInputElement>(null);
  const playerNameRef = useRef<HTMLInputElement>(null);
  const playerNumberRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (latestImg == ""){
      return;
    } else {
      setUploadedImages((curr) => [...curr, latestImg]);
      setLatestImg("");
    }
  }, [latestImg]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    const shirt: CreatShirtInput  = {
      title: titleRef.current?.value!,
      description: descRef.current?.value!,
      price: parseInt(priceRef.current?.value!),
      minPrice: parseInt(minPriceRef.current?.value!),
      year: yearRef.current?.value!,
      clubId: clubRef.current?.value!,
      condition: conditionRef.current?.value!,
      imageUrls: uploadedImages,
      playerName: playerNameRef.current?.value,
      playerNumber: parseInt(playerNumberRef.current?.value!),
    }

    createShirtMutation({
      variables: {
        input: shirt,
      },
      
    });
  }

  return (
    <>
      <h1>Add a new shirt </h1>
      <form onSubmit={submitHandler} style={{display: "flex", flexDirection: "column", maxWidth: "360px", margin: "0 auto", gap: "8px"}}>
        <label>Title</label>
        <input type="text" name="title" ref={titleRef} required/>
        <label>Description</label>
        <input type="text" name="desc" ref={descRef} required/>
        <label>Club</label>
        <ClubSelect ref={clubRef} />
        <label>Price</label>
        <input type="text" name="price" ref={priceRef} required/>
        <label>Min. price</label>
        <input type="text" name="min-price" ref={minPriceRef} required/>
        <label>Year</label>
        <input type="text" name="year" ref={yearRef} required/>
        <label>Condition</label>
        <input type="text" name="condition" ref={conditionRef} required/>
        <label>Player</label>
        <input type="text" name="player-name" ref={playerNameRef}/>
        <label>Player number</label>
        <input type="text" name="player-number" ref={playerNumberRef}/>
        <ImageUpload setImage={setLatestImg}/>
        <div>
          {uploadedImages.map((img) => (
            <img key={crypto.randomUUID()} src={img} />
          )
          )}
        </div>
        <input type="submit" value={"Create"} />
      </form>
    </>
  );
}
