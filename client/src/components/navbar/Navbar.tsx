//import './Navbar.css'
import { NavLink } from 'react-router-dom';
import { UserRound, Home } from 'lucide-react';

export const Navbar = () => {
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
      <div className='flex items-center'>
        <NavLink to="/profile" className="text-white ml-4">
          <UserRound width="32" height="32" />
        </NavLink>
      </div>
    </div>
  );
};
