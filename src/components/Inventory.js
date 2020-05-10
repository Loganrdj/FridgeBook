import React from 'react';
import "./style.css";

function Inventory(props){ 
    
    return  (<div>
                <h2>{props.name} Inventory</h2>
                {console.log(props.ingredients)}
                <div className="container pt-2 container-inner-color">
                <div className="row rowSpacing">
                            <div className="col-md-1">
                                <h5>Quantity:</h5>
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-2">
                                <h5>Expiration:</h5>
                            </div>
                            <div className="col-md-3">
                                <h5>Item Name:</h5>
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-1">
                            </div>
                            <div className="col-md-1">
                            </div>
                        </div>
                        

                {props.ingredients ? props.ingredients.map(item => {
                    var tempDate = new Date(item.date_expire.substring(0, item.date_expire.length - 1))
                    let remain = Math.floor(((new Date(tempDate) - new Date()) / 86400000) + 1);
                    tempDate = (tempDate.getMonth() + 1) + "/" + tempDate.getDate() + "/"+ tempDate.getFullYear();
                    var textClass = "";
                    if (remain === 0){
                        textClass = "warningColor"
                    } else if(remain < 0){
                        textClass = "alertColor"
                    }
                    
                    return(
                        <div key={item.id} className="row rowSpacing fade-in">
                           
                            <div className="col-md-1 fade-in">
                                <p>{item.quantity}</p>
                            </div>
                            <div className="col-md-1 fade-in">
                            </div>
                            <div className="col-md-2 fade-in">
                                <p className={textClass}>{tempDate}</p>
                            </div>
                            {/* <div className="col-md-1">
                            </div>
                            <div className="col-md-1">
                            </div> */}

                            <div className="col-md-3 fade-in">
                                <p className={textClass}>{item.name}</p>
                            </div>
                            <div className="col-md-1 fade-in">
                            </div>
                            <div className="col-md-1 fade-in">
                                <button className="btn btn-kitchen btn-outline-warning" onClick={()=> props.deleteAmount(item.id, 5)}>-5</button>
                            </div>
                            <div className="col-md-1 fade-in">
                                <button className="btn btn-kitchen btn-outline-warning" onClick={()=> props.deleteAmount(item.id, 1)}>-1</button>
                            </div>
                            <div className="col-md-1 fade-in">
                                <button className="btn btn-kitchen btn-outline-danger" onClick={()=> props.delete(item.id)}>X</button>
                            </div>
                            
                        </div>
                    )
                }):""}
                
                </div>
            </div>)

}

export default Inventory