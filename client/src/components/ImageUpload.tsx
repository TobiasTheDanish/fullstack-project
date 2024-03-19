import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface Props {
  setImage: Dispatch<SetStateAction<string>>
}

export function ImageUpload({setImage}: Props ) {
  const submitHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.set("file", file);
    const res = await fetch("http://localhost:4000/upload/single", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const body:{message: string, path:string} = await res.json()
      setImage(body.path);
      e.target.value = "";
    }
  }

  return (
    <label htmlFor="file" className='border border-gray-300 bg-gray-800 text-white inline-block px-16 rounded-md py-2 cursor-pointer'>Add Image
      <input type='file' id="file" name="file" onChange={submitHandler} className='hidden'/>
    </label>
  );
}
