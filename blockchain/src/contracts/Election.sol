pragma solidity ^0.5.16;

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        string details;
        string election_id;
       
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    mapping(uint => bool) public elections;
    mapping(uint => mapping(address=>bool)) public election_voter;
    


    address owner1=0x95C40E2e2ac365e2C5A583f40e0146FF848202De ;
    address owner2=0xED7563d9690964321871917b72f83A9459ffa8D6; 
    modifier ownerOnly(){
        require(msg.sender == owner1 || msg.sender==owner2);
        _;
    }


    // uint256 public time1=1655987666;
    // modifier registrationPhase(){
    //     require(block.timestamp<=time1);
    //     _;
    // }

    // uint256 public time2=1655987666;
    // modifier votingPhase(){
    //     require(block.timestamp>=time2);
    //     _;
    // }

    uint public candidatesCount;
    string public phase="Registration";
    string public candidate;
    address public voter_addr;

    constructor() public {}

    event votedEvent(
        uint indexed _candidateId
    );

    event candidateAddedEvent(
        string  _Election_name
    );

    function addCandidate(string memory _name, string memory _details, string memory _election_id) public ownerOnly {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0, _details, _election_id);
        emit candidateAddedEvent(_name);
    }

    function vote(uint _candidateId,uint _electionId) public {
        require(msg.sender == voter_addr);
        require( !election_voter[_electionId][msg.sender]);

        require(_candidateId > 0 && _candidateId <= candidatesCount);
        
        voters[msg.sender] = true;
        election_voter[_electionId][msg.sender]=true;
        
        
        candidates[_candidateId].voteCount++;
    
        emit votedEvent(_candidateId);
    }

    function voter_account(address addr) public{
        voter_addr=addr;
    }
    function changePhase() public{
        if(keccak256(abi.encodePacked(phase)) == keccak256(abi.encodePacked("Registration")))
        {
            phase="Voting";
        }
       else if(keccak256(abi.encodePacked(phase)) == keccak256(abi.encodePacked("Voting"))){
        phase="Result";
       }
       else{
        phase="Registration"
;       }
    }

}