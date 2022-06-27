import React, { Component } from 'react';
import Web3 from 'web3';
import Election from '../../build/Election.json'
// import { Link } from 'react-router-dom'

class phase extends Component {

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
            const phase=await election.methods.phase().call();
            this.setState({phase});
           
        } else {
            window.alert('Election contract not deployed to detected network.')
        }
    }

    
   
    handleSubmit = (e) =>{
       
            e.preventDefault();
            this.setState({phase:this.state.election.methods.phase().call()  });
            this.changePhase();
    }

    changePhase() {
        
        this.setState({ loading: true })
        this.state.election.methods.changePhase().send({ from: this.state.account })
        .once('receipt', (receipt) => {
            console.log(receipt);
            this.setState({ loading: false });
            
            window.location.assign("/phase");
        }).
        catch((err)=>{
            alert("error");
            window.location.assign("/phase");
        })
    }
    //  changePhase(){
    //     return (
    //         <h4>this.state.phase</h4>
    //     )
    // }

   

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            election: null,         
            candidates: [],
            phase:"",
        }
        this.changePhase = this.changePhase.bind(this)
    }

    render(){
     
        return(
            <div className="container" >
                <form onSubmit={this.handleSubmit}>
                        <h3>Election Phase</h3><br></br>
                        <h4> current phase : {this.state.phase }</h4><br></br>
                        <button className="btn blue darken-2" type="submit" name="action">Change
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
            </div>
        )
    }
}

export default phase;