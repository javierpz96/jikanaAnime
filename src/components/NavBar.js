import React from "react";
import "../assets/css/navbar.css";

import { BrowserRouter as Router, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="containerNav">
      <ul>

        <Link to="/anime"><li>Anime</li></Link>
        <Link to="/manga"><li>Manga</li></Link>
        
      </ul>
    </div>
  );
};

export default NavBar;
