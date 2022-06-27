import React, { Component } from 'react'
import { NavLink, withRouter, Route } from 'react-router-dom'

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: "",
        };
    }
   

    static getDerivedStateFromProps(props,state){
        console.log(props)
        return({
            location: props.history.location.pathname
        })
    }
    render(){
       
       
        if(this.state.location === "/newelection" || this.state.location === "/elections"  || this.state.location === "/phase"  || this.state.location === "/voteCount"){
            return(
                <nav className="nav-wrapper light darken-2" style={{backgroundColor: "#1976D2" }}>
                    <div className="container">
                        <a className="brand-logo">
                            E-Election
                        </a>
                        <ul className="right">
                            <li><NavLink to="/elections">Elections</NavLink></li>
                            <li><NavLink to="/newelection">New Election</NavLink></li>
                            <li><NavLink to="/phase">Change Phase</NavLink></li>
                            <li><NavLink to="/">Logout</NavLink></li>


                        </ul>
                    </div>
                </nav>
            )
        }
        
        else if(this.state.location=== "/userResult" || this.state.location=== "/choose"||this.state.location=== "/userManual"  ){
            return ( 
                <nav className="nav-wrapper"  style={{backgroundColor: "#1976D2" }}>
                    <div className="container">
                        <a className="brand-logo">
                            E-Election
                        </a>
                        <ul className="right">
                            <li><NavLink to="/userManual">User-Manual</NavLink></li>
                            <li><NavLink to="/choose">Elections</NavLink></li>
                            <li><NavLink to="/userResult">Results</NavLink></li>
                            
                            <li><NavLink to="/">Logout</NavLink></li>
                        </ul>
                    </div>
                </nav>
            )
        }
        
        else{
         

            return ( 
                <nav className="nav-wrapper"  style={{backgroundColor: "#1976D2" }}>
                    <div className="container">
                        <a className="brand-logo">
                            E-Election
                        </a>
                    </div>
                </nav>
            )
        }

        
    }
}

export default withRouter(Navbar)