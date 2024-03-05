import './Navbar.css'
import { Link, NavLink } from 'react-router-dom';
import { CircleUserRound, Home } from 'lucide-react';

export const Navbar = () => {
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
      <div className='iconContainer'>
        <Link to="/profile" className="linkIcon">
          <CircleUserRound color="#ffffff" width="32" height="32" />
        </Link>
      </div>
    </div>
  );
};
