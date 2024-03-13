import './Navbar.css'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CircleUserRound, Home } from 'lucide-react';
import { authManager } from '../../lib/utils';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(authManager.isLoggedIn());
  }, [location.pathname]);
  return (
    <div className='navbarContainer'>
      <div className='iconContainer'>
        <NavLink to="/" className="linkIcon">
          <Home color="#ffffff" width="32" height="32" />
        </NavLink>
      </div>
      <div className='linkContainer'>
        <NavLink to="/leagues" className="link" >
          Leagues
        </NavLink>
        <NavLink to="/clubs" className="link">
          Clubs
        </NavLink>
        <NavLink to="/all-shirts" className="link">
          All Shirts
        </NavLink>
      </div>
      {isLoggedIn ? (
      <div className='iconContainer'>
        <Link to="/profile" className="linkIcon">
          <CircleUserRound color="#ffffff" width="32" height="32" />
        </Link>
      </div>
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
