import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const Header = () => (
  <div className="header">
    <NavLink exact to="/"><span>@</span>My component</NavLink>
    <NavLink to="/other"><span>@</span>My Other Component</NavLink>
  </div>
);

export default Header;
