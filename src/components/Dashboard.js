import React, { Component } from 'react';
import "./style.css";
import axios from "axios";
import IngredientInput from './IngredientInput';
import Notifications from './Notifications';
import NotificationWrapper from './NotificationWrapper';

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

    // onClickAlert = () => {
    //     this.alert();
    // }

    render() {
        return (
            <div>
                <h1>Welcome {this.state.user_name}</h1>
                <NotificationWrapper>
                    <Notifications ingredients={this.state.ingredients}></Notifications>
                </NotificationWrapper>
                <IngredientInput afterSubmit={this.updateIngredients}></IngredientInput>
            </div>
        );
    }

}


export default Dashboard;