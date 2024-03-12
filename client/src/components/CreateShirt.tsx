import { useEffect, useState } from "react";
import { ImageUpload } from ".";

export function CreateShirtForm() {
  const [latestImg, setLatestImg] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  useEffect(() => {
    if (latestImg == "") return;
    setUploadedImages((curr) => [...curr, latestImg]);
  }, [latestImg]);

  return (
    <>
      <h1>Add a new shirt </h1>
      <form>
        <label>Title</label>
        <input type="text" name="title" />
        <label>Description</label>
        <input type="text" name="desc" />
        <ImageUpload setImage={setLatestImg}/>
        <div>
          {uploadedImages.map((img) => (
            <img key={crypto.randomUUID()} src={img} />
          )
          )}
        </div>
      </form>
    </>
  );
}
