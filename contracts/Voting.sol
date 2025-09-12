// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;
    bool public votingStarted;
    bool public votingEnded;

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        bytes32 voterIdHash; // cryptographic identity check
    }

    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(address => Voter) public voters;
    Candidate[] public candidates;

    event VoterRegistered(address voter);
    event VoteCasted(address voter, uint candidateIndex);
    event VotingStarted();
    event VotingEnded();

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    modifier onlyDuringVoting() {
        require(votingStarted && !votingEnded, "Voting is not active");
        _;
    }

    constructor(string[] memory candidateNames) {
        admin = msg.sender;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate(candidateNames[i], 0));
        }
    }

    // --- Admin functions ---
    function registerVoter(address _voter, bytes32 _voterIdHash) public onlyAdmin {
        require(!voters[_voter].isRegistered, "Already registered");
        voters[_voter] = Voter(true, false, _voterIdHash);
        emit VoterRegistered(_voter);
    }

    function startVoting() public onlyAdmin {
        require(!votingStarted, "Voting already started");
        votingStarted = true;
        emit VotingStarted();
    }

    function endVoting() public onlyAdmin {
        require(votingStarted, "Voting not started yet");
        require(!votingEnded, "Voting already ended");
        votingEnded = true;
        emit VotingEnded();
    }

    // --- Voter function ---
    function vote(uint candidateIndex, string memory secret) public onlyDuringVoting {
        Voter storage sender = voters[msg.sender];
        require(sender.isRegistered, "Not registered");
        require(!sender.hasVoted, "Already voted");
        require(keccak256(abi.encodePacked(secret)) == sender.voterIdHash, "Identity verification failed");

        sender.hasVoted = true;
        candidates[candidateIndex].voteCount++;
        emit VoteCasted(msg.sender, candidateIndex);
    }

    // --- View functions ---
    function getCandidate(uint index) public view returns (string memory, uint) {
        return (candidates[index].name, candidates[index].voteCount);
    }

    function getCandidateCount() public view returns (uint) {
        return candidates.length;
    }

    function getResults() public view returns (string[] memory, uint[] memory) {
        require(votingEnded, "Results available only after voting ends");

        string[] memory names = new string[](candidates.length);
        uint[] memory votes = new uint[](candidates.length);

        for (uint i = 0; i < candidates.length; i++) {
            names[i] = candidates[i].name;
            votes[i] = candidates[i].voteCount;
        }
        return (names, votes);
    }
}
