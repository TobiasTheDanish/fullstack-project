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
      <>
        <div id="root">
          <div className="hero bg-cover bg-center h-screen flex items-center justify-center text-white" style={{ backgroundImage: `url(${netherlandsHomeKitImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          height: '120vh' }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Jersey Hub</h1>
            <div className="text-center hero-content" style={{ paddingTop: '60vh' }}>
              <h2 className="text-2xl md:text-4xl font-semibold mb-10">Find your unique football shirts</h2>
              <div>
                <Link to={"/all-shirts"}>
                  <button
                    style={{
                      backgroundColor: '#007bff',
                      color: '#fff',
                      padding: '10px 20px',
                      borderRadius: '5px',
                      transition: 'background-color 0.3s, color 0.3s',
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.currentTarget.style.backgroundColor = '#fff';
                      e.currentTarget.style.color = '#007bff';
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.currentTarget.style.backgroundColor = '#007bff';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    Discover
                  </button>

                </Link>
              </div>

            </div>
          </div>
          <div className="recently-added">
            <h2>Recently Added</h2>
            <RecentlyAddedShirts shirts={shirts} />
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
