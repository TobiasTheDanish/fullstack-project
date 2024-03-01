import React from 'react';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ClubList } from '../ClubList';
import LeagueList from '../LeagueList';
import ShirtList from '../ShirtList';

const Navbar = () => {

    const navbarContainer = {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        textAlign: 'center',
    };


    const navbarStyle = {
    backgroundColor: '#333',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-around',
    color: 'white',
    };

    const menuStyle = {
    textDecoration: 'none',
    color: 'white',
    margin: '0 10px',
    cursor: 'pointer',
    };

  return (
    <Router>
      <div style={navbarContainer}>
        <div style={navbarStyle}>
          <Link to="/leagues" style={menuStyle}>
            Leagues
          </Link>
          <Link to="/clubs" style={menuStyle}>
            Clubs
          </Link>
          <Link to="/all-shirts" style={menuStyle}>
            All Shirts
          </Link>
        </div>

        <Routes>
          <Route path="/leagues" element={<LeagueList />} />
          <Route path="/clubs" element={<ClubList />} />
          <Route path="/all-shirts" element={<ShirtList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Navbar;
