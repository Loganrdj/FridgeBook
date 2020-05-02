import React, { Component } from 'react';
import "./style.css";
import Dashboard from './Dashboard';

function Inventory(props){
    
    return  (<div>
                <h2>{props.name} Component</h2>
                {console.log(props.ingredients)}
                <div className = "container border pt-2">
                {props.ingredients ? props.ingredients.map(item => {
                    return(
                        <div key={item.id} className="row">
                            <div className="col-md-1">
                                <p>{item.quantity}</p>
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-1">
                            </div>

                            <div className="col-md-3">
                                <p>{item.name}</p>
                            </div>
                            <div className="col-md-1">
                                <button className="btn btn-warning" onClick={()=> props.deleteAmount(item.id, 10)}>-10</button>
                            </div>
                            <div className="col-md-1">
                                <button className="btn btn-warning" onClick={()=> props.deleteAmount(item.id, 5)}>-5</button>
                            </div>
                            <div className="col-md-1">
                                <button className="btn btn-warning" onClick={()=> props.deleteAmount(item.id, 1)}>-1</button>
                            </div>
                            <div className="col-md-1">
                                <button className="btn btn-danger" onClick={()=> props.delete(item.id)}>X</button>
                            </div>
                        </div>
                        
                    )
                }):""}
                </div>
            </div>)

}

export default Inventory