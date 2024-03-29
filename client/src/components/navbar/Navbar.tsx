import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { authManager } from '../../lib/utils';
import { useEffect, useState } from 'react';
import { CircleUserRound, Home, Instagram } from 'lucide-react';

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    authManager.clearJWT();
    navigate("/sign-in");
  };

  useEffect(() => {
    setIsLoggedIn(authManager.isLoggedIn());
  }, [location.pathname]);
  return (
<div className='bg-gray-800 p-4 flex justify-between items-center w-100' >
      <div className='flex items-center flex-1'>
        <NavLink to="/" className="text-white mr-4">
          <Home width="32" height="32" />
        </NavLink>
      </div>
      <div className='flex items-center flex-2'>
        <NavLink to="/leagues" className="text-white px-4 hover:underline">
          Leagues
        </NavLink>
        <NavLink to="/clubs" className="text-white px-4 hover:underline">
          Clubs
        </NavLink>
        <NavLink to="/shirts" className="text-white px-4 hover:underline">
          Shirts
        </NavLink>
      </div>
      {isLoggedIn ? (
      <>
        <div className='iconContainer flex justify-end gap-3 mr-4 flex-1'>
        <Link to="https://www.instagram.com/stennickes_collection/" target='_blank' className="linkIcon">
          <Instagram color="#ffffff" width="32" height="32" />
        </Link>
        <Link to="/profile" className="linkIcon">
          <CircleUserRound color="#ffffff" width="32" height="32" />
        </Link>
        <button onClick={handleSignOut} className='bg-white rounded-md px-4 py-1'>Sign out</button>
      </div>
      </>
      ) : (
        <div className='flex-1 flex justify-end gap-2'>
          <NavLink to="/sign-in" className="bg-white rounded-md px-4 py-1">
            Sign In
          </NavLink>
          <NavLink to="/sign-up" className="bg-white rounded-md px-4 py-1">
            Sign up
          </NavLink>
        </div>
      )
      }
    </div>
  );
};
