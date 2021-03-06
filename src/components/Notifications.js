import React, {Component } from 'react';
import "./style.css";
import IngredientAlert from './IngredientAlert';

class Notifications extends Component {

    constructor(props) {
        super(props)
        this.state = {props}
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.props.ingredients ? this.props.ingredients.map(item => {
                        if (item.date_expire) {
                            // Store Today as DATE Today Time 00:00:00 Store Expiration date (input) as date 00:00:00
                            let tempDate = item.date_expire.substring(0, item.date_expire.length - 1)
                            let remain = Math.floor(((new Date(tempDate) - new Date()) / 86400000) + 1);
                            return (<IngredientAlert key={item.id} item={item} remain={remain}></IngredientAlert>);
                        }
                        return null;
                        }) : ""}
                </div>
            </div>
        )
    }
}

export default Notifications