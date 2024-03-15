import './App.css';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QueryGetShirts, gqlGetShirts } from './graphql/shirt';
import { Shirt } from './graphql/types';
import { useEffect, useState } from 'react';
import RecentlyAddedShirts from './components/shirts/RecentlyAddedShirts';
import netherlandsHomeKitImage from './assets/imgs/Netherlands-Home-Kit-1988.jpg';

function App() {
  const location = useLocation();
  const [shirts, setShirts] = useState<Shirt[]>([])

  const { data } = useQuery<QueryGetShirts>(gqlGetShirts);

  useEffect(() => {
    if (!data) {
      return
    }

    const sortShirts: Shirt[] = [...data.allShirts].sort((a: Shirt, b: Shirt) => {
      return parseInt(b.createdAt!) - parseInt(a.createdAt!)
    })
    const recentlyAddedShirts: Shirt[] = sortShirts.slice(0, 4) || [];
    setShirts(recentlyAddedShirts)
  }, [data])

  if (location.pathname === '/') {
    return (
      <div id="root" className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${netherlandsHomeKitImage})` }}>
        <div className="flex flex-col justify-center items-center h-full text-white">
          <h2 className="text-2xl md:text-4xl mb-4">Find your unique football shirts</h2>
          <div>
            <Link to="/all-shirts">
              <button className="bg-blue-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-white hover:text-blue-500">
                Discover
              </button>
            </Link>
          </div>
        </div>
        <div className="recently-added">
          <h2 className="text-2xl">Recently Added</h2>
          <RecentlyAddedShirts shirts={shirts} />
        </div>
      </div>
    );
  };
  return (
    <>
      <div id="root">
        <Outlet />
      </div>
    </>
  );
}

export default App;
