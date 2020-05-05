import React, { Component } from 'react';
import "./style.css";
import Inventory from "./Inventory"
import axios from "axios";

class Kitchen extends Component{

    state = { 
        ingredients_fridge: undefined, 
        ingredients_pantry: undefined
    };

    componentDidMount() {
        axios.get('/profile').then((response) => {
            if (response.data) {
                let kitchenArr = [];
                let pantryArr = [];
                for(let i = 0; i < response.data.ingredients.length; i++){
                    if(response.data.ingredients[i].fridge_bool === true){
                        kitchenArr.push(response.data.ingredients[i]);
                    } else {
                        pantryArr.push(response.data.ingredients[i]);
                    }
                }
                // console.log(response.data);
                this.setState({ ingredients_fridge: kitchenArr, ingredients_pantry: pantryArr });
                
            }
        })
    }

    updateIngredients = () => {
        axios.get('/profile').then((response) => {
            if (response.data) {
                let kitchenArr = [];
            let pantryArr = [];
            for(let i = 0; i < response.data.ingredients.length; i++){
                if(response.data.ingredients[i].fridge_bool === true){
                    kitchenArr.push(response.data.ingredients[i]);
                } else {
                    pantryArr.push(response.data.ingredients[i]);
                }
            }
            // console.log(response.data);
            this.setState({ ingredients_fridge: kitchenArr, ingredients_pantry: pantryArr });
            }
        })
    }

    removeIngredients = (id) => {
        console.log(id)
        axios.delete(`/api/ingredient/${id}`).then((response) => {
            if (response.data) this.updateIngredients();
        });
    }

    deleteAmount = (id, quantity_to_delete) => {
        console.log(id)
        axios.put(`/api/ingredient/${id}`,{quantity: quantity_to_delete}).then((response) => {
            if (response.data) this.updateIngredients();
        });
    }

    render(){
        return <div>
                <h1>Kitchen Page</h1>
                    <div className="row">
                        <div className="col-md-6">
                            <Inventory name="Fridge" ingredients={this.state.ingredients_fridge} delete={this.removeIngredients} deleteAmount={this.deleteAmount}/>
                        </div>
                        <div className="col-md-6">
                            <Inventory name="Pantry" ingredients={this.state.ingredients_pantry} delete={this.removeIngredients} deleteAmount={this.deleteAmount}/>
                        </div>
                    </div>
                </div>
    }
}


export default Kitchen;
