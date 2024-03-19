import { FormEvent, useEffect, useRef, useState } from "react";
import { ClubSelect, ImageUpload } from "..";
import { useMutation } from "@apollo/client";
import { CreatShirtInput, gqlCreateShirtMutation } from "../../graphql/shirt";

export function CreateShirtForm() {
  const [error, setError] = useState<string | null>(null)
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
    if (latestImg == "") {
      return;
    } else {
      setUploadedImages((curr) => [...curr, latestImg]);
      setLatestImg("");
    }
  }, [latestImg]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const shirt: CreatShirtInput = {
        title: titleRef.current?.value!,
        description: descRef.current?.value!,
        price: Number(priceRef.current?.value!),
        minPrice: Number(minPriceRef.current?.value!),
        year: yearRef.current?.value!,
        clubId: clubRef.current?.value!,
        condition: conditionRef.current?.value!,
        imageUrls: uploadedImages,
        playerName: playerNameRef.current?.value,
        playerNumber: parseInt(playerNumberRef.current?.value!),
      };
      
      await createShirtMutation({
        variables: {
          input: shirt,
        },
      });


      //Cleaning up refs & states after submitting
      titleRef.current!.value = '';
      descRef.current!.value = '';
      priceRef.current!.value = '';
      minPriceRef.current!.value = '';
      yearRef.current!.value = '';
      clubRef.current!.value = '';
      conditionRef.current!.value = '';
      playerNameRef.current!.value = '';
      playerNumberRef.current!.value = '';
      setLatestImg("");
      setUploadedImages([]);

    } catch (error) {
      console.log("catched error")
      setError("Invalid Price")
    }
    };
    
  return (
    <>
      <form onSubmit={submitHandler} className="max-w-sm md:max-w-md lg:max-w-lg mx-auto border border-gray-800 p-5 rounded-md">
      <h1 className="text-4xl font-bold text-center">Add a new shirt </h1>
      <hr className="m-4" />
        {error && <p>{error}</p>}
        <div className="mb-4">
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            name="title"
            ref={titleRef}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block">
            Description
          </label>
          <input
            type="text"
            name="desc"
            ref={descRef}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="club" className="block">
            Club
          </label>
          <ClubSelect
            ref={clubRef}
           />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block">
            Price
          </label>
          <input
            type="number"
            name="price"
            ref={priceRef}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="min-price" className="block">
            Min. price
          </label>
          <input
            type="number"
            name="min-price"
            ref={minPriceRef}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block">
            Year
          </label>
          <input
            type="text"
            name="year"
            ref={yearRef}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="condition" className="block">
            Condition
          </label>
          <input
            type="text"
            name="condition"
            ref={conditionRef}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="player-name" className="block">
            Player
          </label>
          <input
            type="text"
            name="player-name"
            ref={playerNameRef}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="player-number" className="block">
            Player number
          </label>
          <input
            type="text"
            name="player-number"
            ref={playerNumberRef}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
          />
        </div>
        <ImageUpload setImage={setLatestImg} />
        <div>
          {uploadedImages.map((img) => (
            <img key={crypto.randomUUID()} src={img} />
          ))}
        </div>
        <input
          type="submit"
          value="Create"
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-md cursor-pointer focus:outline-none mt-6 hover:bg-gray-900"
        />
      </form>
    </>
  );
}
