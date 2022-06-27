import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class userResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
            final: [],
            id: null,
        };
    }

    componentDidMount(){
        let currentComponent = this;
      
        axios.get('http://localhost:8000/api/electionName', {})
        .then(function(response){ 
            var data = response.data;
            currentComponent.setState({
               
                final: data
            })
        })
        .catch(function(err){
            console.error(err);
        });

    }

    handleInputChange = (e) => {
      
    };


    render(){
        const electionList = this.state.final.map(election => {
            return (
                <div className="contact" key={election.election_id}>
                    <li className="collection-item avatar">
                        <i className="material-icons circle blue darken-2">ballot</i>
                        <p><b>{election.election_name}</b></p>
                        <br></br>
                        
                        <Link to={"/voteCount/" + election.election_id} className="title" onClick={this.handleInputChange}><button id={election.election_id} className="waves-effect waves-light btn  darken-3" style={{backgroundColor:"#19D2D1",color:"#ffffff"}}>View vote Count</button></Link>
                        &nbsp;&nbsp;&nbsp;
                        <Link to={"/result/" + election.election_id} className="title" onClick={this.handleInputChange}><button id={election.election_id} className="waves-effect waves-light btn  darken-3" style={{backgroundColor:"#19D2D1",color:"#ffffff"}}>Result</button></Link>

                    </li>
                </div>
            )
        }) 
        return(
            <div className="container">
                <ul className="collection">
                    <li className="collection-item avatar">
                        <h3>Elections</h3>
                    </li>
                        {electionList}
                </ul>
            </div>
        )
    }
}

export default userResult;