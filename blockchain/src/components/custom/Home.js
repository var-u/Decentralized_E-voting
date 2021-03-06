import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            showComponents: false
        }
    }


    render(){
        return (
            <div className="container">
                <ul className="collection with-header">
                <li className="collection-header"><h3>Choose User Type</h3></li>
                    <li className="collection-item"><div><h4>Voter<Link to="/userLogin" className="secondary-content"><i className="material-icons" style={{color:"#1976D2"}}>send</i></Link></h4></div></li>
                    <li className="collection-item"><div><h4>Admin<Link to="/login" className="secondary-content"><i className="material-icons" style={{color:"#1976D2"}}>send</i></Link></h4></div></li>
                </ul>
            </div>
        )
    }
}

export default Home