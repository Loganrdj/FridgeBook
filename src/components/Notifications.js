import React from 'react';
import "./style.css";
import moment from 'moment';

function Notifications(props){
    return(
        <div className="container">
            <div className="row">
            {props.ingredients ? props.ingredients.map(item => {
                if(item.date_expire){
                    item.date_expire = moment().format('DD-MM-YYYY')
                    console.log(moment().format(item.date_expire) - moment().calendar())
                }
                return(
                    <div></div>
                )
                }):""}
            </div>
        </div>
    )
}

export default Notifications