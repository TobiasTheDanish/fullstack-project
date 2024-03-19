import './Navbar.css'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { authManager } from '../../lib/utils';
import { useEffect, useState } from 'react';
import { CircleUserRound, Home, Instagram } from 'lucide-react';

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(authManager.isLoggedIn());
  }, [location.pathname]);
  return (
<div className='bg-blue-500 p-4 flex justify-between items-center'>
      <div className='flex items-center'>
        <NavLink to="/" className="text-white mr-4">
          <Home width="32" height="32" />
        </NavLink>
      </div>
      <div className='flex items-center'>
        <NavLink to="/leagues" className="text-white px-4 hover:underline">
          Leagues
        </NavLink>
        <NavLink to="/clubs" className="text-white px-4 hover:underline">
          Clubs
        </NavLink>
        <NavLink to="/all-shirts" className="text-white px-4 hover:underline">
          All Shirts
        </NavLink>
      </div>
      {isLoggedIn ? (
        <>
          <div className='iconContainer'>
            <Link to="/profile" className="linkIcon">
              <CircleUserRound color="#ffffff" width="32" height="32" />
            </Link>
            <Link to="https://www.instagram.com/stennickes_collection/" className="linkIcon">
              <Instagram color="#ffffff" width="32" height="32" />
            </Link>
          </div>
        </>
      ) : (
        <div className='signInContainer'>
          <NavLink to="/sign-in" className="link">
            Sign In
          </NavLink>
          <NavLink to="/sign-up" className="link">
            Sign up
          </NavLink>
        </div>
      )
      }
    </div>
  );
};
