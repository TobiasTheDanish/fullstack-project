import { useState } from 'react';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom'
import { ImageUpload } from './components/ImageUpload';

function App() {
  const [image, setImage] = useState<string>("");

  const location = useLocation()
  if (location.pathname === '/') {
    return (
      <>
        <h1>Hello, and welcome to our page</h1>
        <ImageUpload setImage={setImage} />
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
