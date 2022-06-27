import React, { Component } from 'react';
import NewElection from './components/custom/NewElection';
import NavBar from './components/custom/Navbar';
import Home from './components/custom/Home';
import Vote from './components/custom/Vote';
import VoteCount from './components/custom/VoteCount';
import ElectionData from './components/custom/ElectionData';
import Choose from './components/custom/Choose';
import { BrowserRouter, Route } from 'react-router-dom';
import NewCandidate from './components/custom/NewCandidate';
import Login from './components/custom/Login';
import userLogin from './components/custom/userLogin';
import result from './components/custom/result';
import phase from './components/custom/phase';
import registrationPhase from './components/custom/registrationPhase';
import userResult from './components/custom/userResult';

import axios from 'axios'
import Web3 from 'web3';
import Election from './build/Election.json';

class App extends Component {

    constructor(props){
        super(props);
        this.state={
            phase:"",
            election:null,
        }
    }


    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
      }
    
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        console.log(accounts)
        this.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = Election.networks[networkId]
        if(networkData) {
            const election = new web3.eth.Contract(Election.abi, networkData.address)
            this.setState({ election })
            const phase= await election.methods.phase().call();
            this.setState({phase});
           
           
        } else {
            window.alert('Election contract not deployed to detected network.')
        }
    }


    getVal = () => {
        console.log('Test!')
    }

    render(){
            const a="hi";
            console.log(this.state.phase);
        return (
        <BrowserRouter>
            <div className="App">
                <NavBar getVal={this.getVal}/>
               
                <Route exact path="/" component={Home} />
               
                <Route exact path="/newelection" component={   NewElection   } />               
                <Route exact path="/elections" component={ElectionData} />
                <Route exact path="/candidates/:id" component={NewCandidate} />
                <Route exact path="/vote/:id" component={Vote} />
                <Route exact path="/choose" component={Choose} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/voteCount/:id" component={VoteCount}/>
                <Route exact path="/result/:id" component={result}/>
                <Route exact path="/userLogin" component={ this.state.phase === "Registration" ?  registrationPhase : userLogin} />
                <Route exact path="/phase" component={phase}/>
                <Route exact path="/userResult" component={userResult}/>

            </div>
        </BrowserRouter>
        );
    }
}

export default App;
