import React, { Component } from 'react';

// import { Link } from 'react-router-dom'

class userManual extends Component {

    render(){
        return (
            <div class="container">
                <h2>Welcome</h2>
                <h3> These are few Guidelines for user:</h3>
                    <h4>1. Voter Registration</h4>
                        <ol>
                            <li>
                                For casting the vote user needs to first register himself.For this registration purpose,the user will be providedavoter registration
                                form on this website
                            </li>
                            <li>
                            The voter can only register in the registration phase.After the registration phase is over the user can not register and thus will not
                            be able to vote
                            </li>
                            <li>
                                For registration,the user will have to enter his Aadhar card number and the account address which the user will be using for
                                voting purpose
                            </li>
                            <li>.At the first stage the user's age will be checked.If the user is 18 or above 18 years of age then only he is eligible to vote</li>
                            <li>The second stage is OTP verification.This stage is required to validate the voter itself.After entering the aadhar number and
                                successful age verification</li>
                            <li>After entering correct OTP user will get successfully registered.</li>
                        </ol>
  
  
<h4>2.Voting Process</h4>

  <ol>
  <li>Overall,voting process is divided into three phases.All of which will be initialized and terminated by the admin.User have to
   participate in the process according to current phase</li>
    <li>
    Registration Phase.During this phase the registration of the users(which are going to cast the vote)will be carried out.
    </li>
    <li>Voting Phase After initialization of voting phase from the admin,user can cast the vote in voting section The casting of vote can
   be simply done by clicking on"VOTE"button,after which transaction will be initiated and after confirming transaction the vote will
   get successfully casted After voting phase gets over user will not be able to cast vote</li>
   <li>Result Phase.This is the final stage of whole voting process during which the results of election will be displayed at"Result"
   section</li>
  </ol>
            </div>
        )
    }

}
export default userManual;


 