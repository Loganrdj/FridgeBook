import React, { Component } from 'react';
import './App.css';

import Nav from "./components/Nav"
import Kitchen from "./components/Kitchen"
import Dashboard from "./components/Dashboard"
import Recipes from "./components/Recipes"
import Cart from "./components/Cart"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  render(){
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/kitchen" component={Kitchen}/>
            <Route exact path="/recipes" component={Recipes}/>
            <Route exact path="/cart" component={Cart}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
