import { Dispatch, FormEvent, SetStateAction } from 'react';

interface Props {
  setImage: Dispatch<SetStateAction<string>>
}

export function ImageUpload({setImage}: Props ) {
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.nativeEvent.target as HTMLFormElement);
    const res = await fetch("http://localhost:4000/upload/single", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const body:{message: string, path:string} = await res.json()
      setImage(body.path);
    }
  }

  return (
    <form encType='multipart/form-data' onSubmit={submitHandler}>
      <input type='file' name='file' />
      <input type='submit' value={"Submit"}/>
    </form>
  );
}
