import React, { Component } from 'react'
import axios from 'axios'
import Web3 from 'web3';
import Election from '../../build/Election.json'

class userLogin extends Component {


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
            
           
        } else {
            window.alert('Election contract not deployed to detected network.')
        }
    }




    /////////////////////////////////////////
    constructor(props){
        super(props)
        this.state = {
            username: null,
            aadhaar : null,
            voter_id: null,
            wallet: "",
            election:null,
            account: "",
           
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.state.election.methods.voter_account(this.state.wallet).send({ from: this.state.account });
        
        const { username, aadhaar,voter_id,wallet } = this.state;
        console.log(username)
        axios.post('http://localhost:8000/api/userLogin', {
            username: username,
            aadhaar: aadhaar,
            voter_id: voter_id,
            wallet: wallet,
           
        })
        .then(function(response){ 
           
                
            // if(response.data){
                if(response.data){
                    // this.state.election.methods.voter_account(this.state.wallet).send({ from: this.state.account })
                    // .once('receipt', (receipt) => {
                    //     console.log(receipt);
                    //     this.setState({ loading: false })
                        
                    // }).
                    // catch((err)=>{
                    //     alert("multiple vote cast attempt detected");
                      
                    // })

                window.location.assign("/choose");
                
                 
                   
                   

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
                <br></br>
                    <input type="text" id="username" name="username" onChange={this.handleInputChange} required/>
                    <label htmlFor="name">Username</label><br></br>
                    <input type="text" maxLength="12" id="aadhaar" name="aadhaar" onChange={this.handleInputChange} required/>
                    <label htmlFor="Aadhaar">Aadhaar</label><br></br>
                    <input type="text" maxLength="10" id="voter_id" name="voter_id" onChange={this.handleInputChange} required/>
                    <label htmlFor="voter_id">voter_id(EPIC number)</label><br></br>
                    <input type="text"  id="wallet" name="wallet" onChange={this.handleInputChange} required/>
                    <label htmlFor="voter_id">Wallet address(</label><br></br><br></br>
                    
                    <button className="btn blue darken-2" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>      
        )
    }
}

export default userLogin;