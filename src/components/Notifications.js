import React, { useState, Component } from 'react';
import "./style.css";
import Alert from 'react-bootstrap/Alert';

class Notifications extends Component {
    
    constructor(props){
        super(props)
        this.state = {props, show: true, ingredients: ""}
    }

    handleFalse = (id) => {
        // id = id.target
        // console.log(id);
        this.setState({
            show: false
        });
    }
    // const [show, setShow] = useState(true);
    // const handleFalse = () => setShow(false);
    // const handleTrue = () => setShow(true);
    render(){
        return(
            <div className="container">
                <div className="row">
                {this.props.ingredients ? this.props.ingredients.map(item => {
                    if(item.date_expire){
                        // Store Today as DATE Today Time 00:00:00 Store Expiration date (input) as date 00:00:00
                        let tempDate = item.date_expire.substring(0,item.date_expire.length-1)
                        let remain = Math.floor(((new Date(tempDate) - new Date())/86400000)+ 1);
                        if(remain === 1 || remain === 2 ){
                            return(
                                <Alert variant={'info'} show={this.state.show} key={item.id} onClick={this.handleFalse} dismissible>
                                    {item.name} will expire in {remain} amount of day(s)!
                                </Alert>
                            )
                        } else if(remain === 0){
                            return(
                                <Alert variant={'warning'} show={this.state.show} key={item.id} onClick={this.handleFalse} dismissible>
                                    {item.name} will expire today!
                                </Alert>
                            )
                        } else if(remain < 0){
                            return(
                                <Alert variant={'danger'} show={this.state.show} key={item.id} onClick={this.handleFalse} dismissible>
                                    {item.name} is expired!
                                </Alert>
                            )
                        }
                    }
                    return null;
                    }):""}
                </div>
            </div>
        )
    }
}

export default Notifications