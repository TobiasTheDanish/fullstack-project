import "./App.css";
import { Outlet, useLocation, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QueryGetShirts, gqlGetShirts } from "./graphql/shirt";
import { Shirt } from "./graphql/types";
import { useEffect, useState } from "react";
import RecentlyAddedShirts from "./components/shirts/RecentlyAddedShirts";
import netherlandsHomeKitImage from "./assets/imgs/Netherlands-Home-Kit-1988.jpg";

function App() {
  const location = useLocation();
  const [shirts, setShirts] = useState<Shirt[]>([]);

  const { data } = useQuery<QueryGetShirts>(gqlGetShirts);

  useEffect(() => {
    if (!data) {
      return;
    }

    const sortShirts: Shirt[] = [...data.allShirts].sort(
      (a: Shirt, b: Shirt) => {
        return parseInt(b.createdAt!) - parseInt(a.createdAt!);
      }
    );
    const recentlyAddedShirts: Shirt[] = sortShirts.slice(0, 4) || [];
    setShirts(recentlyAddedShirts);
  }, [data]);

  if (location.pathname === "/") {
    return (
      <>
        <div className="relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-stroke text-white text-2xl font-bold mb-2">
              Find your unique football shirt
            </h2>
            <Link to="/shirts">
              <button className="bg-gray-800 text-white font-bold py-2 px-20 rounded transition duration-300 hover:bg-gray-700 ">
                Discover
              </button>
            </Link>
          </div>
          <img src={netherlandsHomeKitImage} alt="Image" className="w-full mx-auto md:mx-0 lg:mx-0" />
        </div>
        <div>
        <h2 className="text-4xl font-bold text-center mt-4">Recently Added</h2>
        <hr className="m-4"/>
          <RecentlyAddedShirts shirts={shirts} />
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
