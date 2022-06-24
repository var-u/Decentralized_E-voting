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


    address owner=0x95C40E2e2ac365e2C5A583f40e0146FF848202De;
    modifier ownerOnly(){
        require(msg.sender == owner);
        _;
    }


    // uint256 public time1=1655987666;
    // modifier registrationPhase(){
    //     require(block.timestamp<=time1);
    //     _;
    // }

    uint256 public time2=1655987666;
    modifier votingPhase(){
        require(block.timestamp>=time2);
        _;
    }

    uint public candidatesCount;

    string public candidate;

    constructor() public {}

    event votedEvent(
        uint indexed _candidateId
    );

    event candidateAddedEvent(
        string  _name
    );

    function addCandidate(string memory _name, string memory _details, string memory _election_id) public ownerOnly {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0, _details, _election_id);
        emit candidateAddedEvent(_name);
    }

    function vote(uint _candidateId) public votingPhase{
        require(!voters[msg.sender]);

        require(_candidateId > 0 && _candidateId <= candidatesCount);
        
        voters[msg.sender] = true;
        
        candidates[_candidateId].voteCount++;
    
        emit votedEvent(_candidateId);
    }

}