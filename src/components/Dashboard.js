import React, { Component } from 'react';
import "./style.css";
import axios from "axios";
import IngredientInput from './IngredientInput';

class Dashboard extends Component {
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

    updateIngredients = () => {
        axios.get('/profile').then((response) => {
            if (response.data) this.setState({ ingredients: response.data.ingredients });
        })
    }

    removeIngredients = (id) => {
        axios.delete(`/api/ingredient/${id}`).then((response) => {
            if (response.data) this.updateIngredients();
        });
    }

    render() {
        return (
            <div>
                <h1>Welcome {this.state.user_name}</h1>
                {/* {this.state.login ?
                    <a href='http://localhost:8080/auth/logout'><button className="px-3 py-2 rounded-md bg-blue-500 text-white focus:outline-none hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed">Log Out</button></a>
                    :
                    <a href='http://localhost:8080/auth/google'><button className="justify-content:center px-3 py-2 rounded-md bg-blue-500 text-white focus:outline-none hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed">Log In</button></a>
                } */}
                <IngredientInput afterSubmit={this.updateIngredients}></IngredientInput>
                
                {/* --------------Replace this part with component---------------*/}
                {/* ------------------api testing purpose only-------------------*/}
                <div>
                    {this.state.ingredients ? this.state.ingredients.map(x => { return (<div key={x.id}><li>{`Name:${x.name}, Quantitiy:${x.quantity} ,Date Start:${x.date_start}, Date Expire:${x.date_expire} Location:${(x.fridge_bool ? "Pantry" : "Fridge")}`}</li><button onClick={() => this.removeIngredients(x.id)}>x</button></div>) }) : ""}
                </div>
                {/*--------------------------------------------------------------*/}

            </div>
        );
    }

}


export default Dashboard;