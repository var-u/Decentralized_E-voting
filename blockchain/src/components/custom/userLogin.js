import React, { Component } from 'react'
import axios from 'axios'

class userLogin extends Component {

    constructor(props){
        super(props)
        this.state = {
            'username': null,
            "aadhaar" : null
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, aadhaar } = this.state;
        console.log(username)
        axios.post('http://localhost:8000/api/userLogin', {
            username: username,
            aadhaar: aadhaar
        })
        .then(function(response){ 
            // if(response.data){
                if(response.data){
                window.location.assign("/choose")
            }else{
                alert('Incorrect Username or Password');
            }
        })
        .catch(function(err){
            console.error(err);
        });
    }


    render(){
        return(
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="username" name="username" onChange={this.handleInputChange} required/>
                    <label htmlFor="name">Username</label><br></br>
                    <input type="number" id="aadhaar" name="aadhaar" onChange={this.handleInputChange} required/>
                    <label htmlFor="name">Aadhaar</label><br></br><br></br>
                    <button className="btn blue darken-2" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>      
        )
    }
}

export default userLogin;