import React, { Component } from 'react';
import "./style.css";
import { Link } from 'react-router-dom';
import axios from "axios";

class Nav extends Component {
state = { user_name: undefined, ingredients: undefined, login: false };

componentDidMount() {
    axios.get('/profile').then((response) => {
        if (response.data) {
            // console.log(response.data);
            this.setState({ login: true, user_name: response.data.user_name, ingredients: response.data.ingredients });
        } else {
            this.setState({ login: false, user_name: undefined, ingredients: undefined });
        }
    })
}

render() {
  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
           <a className="navbar-brand color:blue" href="/">FridgeBook</a>
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
                <Link to="/calendar" className="nav-link">
                    <li className="nav-item">Calendar</li>
                </Link>
            </ul>
            {this.state.login ?
                    <a href='http://localhost:8080/auth/logout'><button className="px-3 py-2 rounded-md bg-blue-500 text-white focus:outline-none hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed">Log Out</button></a>
                    :
                    <a href='http://localhost:8080/auth/google'><button className="justify-content:center px-3 py-2 rounded-md bg-blue-500 text-white focus:outline-none hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed">Log In</button></a>
                }
      </nav>
  );
            }
}

export default Nav;
