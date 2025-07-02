// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;

    struct Voter {
        bool isRegistered;
        bool hasVoted;
    }

    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(address => Voter) public voters;
    Candidate[] public candidates;

    constructor(string[] memory candidateNames) {
        admin = msg.sender;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate(candidateNames[i], 0));
        }
    }

    function registerVoter(address _voter) public {
        require(msg.sender == admin, "Only admin can register voters");
        voters[_voter].isRegistered = true;
    }

    function vote(uint candidateIndex) public {
        require(voters[msg.sender].isRegistered, "Not registered");
        require(!voters[msg.sender].hasVoted, "Already voted");
        voters[msg.sender].hasVoted = true;
        candidates[candidateIndex].voteCount++;
    }

    function getCandidate(uint index) public view returns (string memory, uint) {
        return (candidates[index].name, candidates[index].voteCount);
    }

    function getCandidateCount() public view returns (uint) {
        return candidates.length;
    }
}
