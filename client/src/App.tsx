import { FormEvent, useState } from 'react';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom'

function App() {
  const [image, setImage] = useState<string>("");

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

  const location = useLocation()
  if (location.pathname === '/') {
    return (
      <>
        <h1>Hello, and welcome to our page</h1>
        <form encType='multipart/form-data' onSubmit={submitHandler}>
          <input type='file' name='file' />
          <input type='submit' value={"Submit"}/>
        </form>
        {image != "" && <img src={image} />}
      </>
    );
  }
  return (
    <>
      <Outlet />
    </>
  )
}

export default App
