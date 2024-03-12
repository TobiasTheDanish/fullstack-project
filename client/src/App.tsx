import './App.css';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { AllShirtList } from './components';
import { useQuery } from '@apollo/client';
import { QueryGetShirts, gqlGetShirts } from './graphql/shirt';
import { Shirt } from './graphql/types';
import { useEffect, useState } from 'react';

function App() {
  const location = useLocation();
  const [shirts, setShirts] = useState<Shirt[]>([])

  const { data } = useQuery<QueryGetShirts>(gqlGetShirts);

  useEffect (() =>  {
    console.log(data)
    if(!data) {
      return
    }

    const sortShirts: Shirt[] = [...data.allShirts].sort((a: Shirt, b: Shirt)=> {
      return parseInt(b.createdAt!) - parseInt(a.createdAt!)
    })
    const recentlyAddedShirts: Shirt[] = sortShirts.slice(0, 4) || [];
    setShirts(recentlyAddedShirts)
  }, [data])

  if (location.pathname === '/') {
    return (
      <>
        <div id="root">
          <div className="background-section">
            <div className="background-content">
              <h1>Jersey Hub</h1>
            </div>
          </div>
          <div className="content-container">
            <div className="homepage">
              <h2>Find your unique football shirts here</h2>
              <Link to="/all-shirts">
                <div className='clickable-box'>
                  Discover
                </div>
              </Link>
            </div>
          </div>
          <div className="recently-added">
            <h2>Recently Added</h2>
            <AllShirtList shirts={shirts}/>
          </div>
        </div>
      </>
    );
  } 
  return (
    <>
      <div id="root">
        <Outlet />
      </div>
    </>
  );
}

export default App;
