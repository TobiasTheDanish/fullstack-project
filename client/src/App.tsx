import './App.css';
import { Outlet, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  if (location.pathname === '/') {
    return (
      <>
        <h1>Hello, and welcome to our page</h1>
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
