import React from 'react';
import "./style.css";
import { Link } from 'react-router-dom';

function Nav() {
  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="title" to="/">
                <h1>FridgeBook</h1>
            </Link>
            <ul className="nav-links navbar-nav mr-auto">
                <Link to="/dashboard" className="nav-link">
                    <li className="nav-item">Dashboard</li>
                </Link>
                <Link to="/kitchen" className="nav-link">
                    <li className="nav-item">Kitchen</li>
                </Link>
                <Link to="/recipes" className="nav-link">
                    <li className="nav-item">Recipes</li>
                </Link>
                <Link to="/cart" className="nav-link">
                    <li className="nav-item">Shopping Cart</li>
                </Link>
            </ul>
      </nav>
  );
}

export default Nav;
