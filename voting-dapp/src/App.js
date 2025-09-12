// src/App.js
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Voting from "./contracts/Voting.json";
import config from "./config";

function App() {
  const [account, setAccount] = useState("");
  const [admin, setAdmin] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [voterAddress, setVoterAddress] = useState("");
  const [voterSecret, setVoterSecret] = useState("");
  const [voteSecret, setVoteSecret] = useState("");
  const [contract, setContract] = useState(null);
  const [results, setResults] = useState([]);
  const [votingStarted, setVotingStarted] = useState(false);
  const [votingEnded, setVotingEnded] = useState(false);

  // 🔹 Connect Wallet
  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);

        const signer = await provider.getSigner();
        const contractInstance = new ethers.Contract(
          config.contractAddress,
          Voting.abi,
          signer
        );
        setContract(contractInstance);

        await loadContractData(contractInstance, accounts[0]);
      } catch (err) {
        alert("Wallet connection failed: " + err.message);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  // 🔹 Load contract data
  async function loadContractData(contract, userAccount) {
    try {
      const adminAddress = await contract.admin();
      setAdmin(adminAddress);
      setIsAdmin(userAccount.toLowerCase() === adminAddress.toLowerCase());

      const count = await contract.getCandidateCount();
      const temp = [];
      for (let i = 0; i < count; i++) {
        const candidate = await contract.getCandidate(i);
        temp.push({ name: candidate[0], votes: candidate[1].toString() });
      }
      setCandidates(temp);

      const started = await contract.votingStarted();
      const ended = await contract.votingEnded();
      setVotingStarted(started);
      setVotingEnded(ended);
    } catch (err) {
      console.error("Error loading contract data:", err);
    }
  }

  // 🔹 Vote (only for voters, not admin)
  async function vote(index) {
    try {
      if (contract) {
        if (!voteSecret) {
          alert("Please enter your secret before voting.");
          return;
        }
        const tx = await contract.vote(index, voteSecret);
        await tx.wait();
        alert("Vote cast successfully!");
        setVoteSecret("");
        await loadContractData(contract, account);
      }
    } catch (error) {
      console.error("Voting failed:", error);
      alert(error.reason || error.message || "Voting failed");
    }
  }

  // 🔹 Register voter
  async function registerVoter() {
    try {
      if (contract) {
        if (!voterAddress || !ethers.isAddress(voterAddress)) {
          alert("Please enter a valid Ethereum address.");
          return;
        }
        if (!voterSecret) {
          alert("Please provide a secret for the voter.");
          return;
        }
        const hash = ethers.keccak256(ethers.toUtf8Bytes(voterSecret));
        const tx = await contract.registerVoter(voterAddress.trim(), hash);
        await tx.wait();
        alert("Voter registered successfully!");
        setVoterAddress("");
        setVoterSecret("");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.reason || error.message || "Registration failed");
    }
  }

  // 🔹 Admin controls
  async function startVoting() {
    try {
      const tx = await contract.startVoting();
      await tx.wait();
      alert("Voting started!");
      setVotingStarted(true);
    } catch (error) {
      console.error("Start voting failed:", error);
      alert(error.reason || error.message || "Failed to start voting");
    }
  }

  async function endVoting() {
    try {
      const tx = await contract.endVoting();
      await tx.wait();
      alert("Voting ended!");
      setVotingEnded(true);
    } catch (error) {
      console.error("End voting failed:", error);
      alert(error.reason || error.message || "Failed to end voting");
    }
  }

  // 🔹 Fetch results after voting ends
  async function fetchResults() {
    try {
      if (contract) {
        const [names, votes] = await contract.getResults();
        const formatted = names.map((n, i) => ({
          name: n,
          votes: votes[i].toString(),
        }));
        setResults(formatted);
      }
    } catch (error) {
      console.error("Fetching results failed:", error);
      alert(error.reason || error.message || "Failed to fetch results");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Blockchain Voting DApp</h1>

      {!account ? (
        <button
          onClick={connectWallet}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p><b>Connected Account:</b> {account}</p>
          <p><b>Admin Address:</b> {admin}</p>
          <p>
            <b>Voting Status:</b>{" "}
            {votingEnded ? "Ended" : votingStarted ? "Active" : "Not started"}
          </p>

          <h2>Candidates</h2>
          {candidates.map((c, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <span>{c.name} - {c.votes} votes </span>
              {!isAdmin && !votingEnded && votingStarted && (
                <button onClick={() => vote(i)}>Vote</button>
              )}
            </div>
          ))}

          {!isAdmin && votingStarted && !votingEnded && (
            <div style={{ marginTop: "20px" }}>
              <h3>Enter Your Secret Before Voting</h3>
              <input
                type="password"
                placeholder="Enter your secret"
                value={voteSecret}
                onChange={(e) => setVoteSecret(e.target.value)}
                style={{ width: "300px", marginRight: "10px" }}
              />
            </div>
          )}

          {isAdmin ? (
            <div style={{ marginTop: "20px" }}>
              <h3>Admin Controls</h3>
              {!votingStarted && !votingEnded && (
                <button onClick={startVoting}>Start Voting</button>
              )}
              {votingStarted && !votingEnded && (
                <button onClick={endVoting}>End Voting</button>
              )}

              <h3 style={{ marginTop: "20px" }}>Register Voter</h3>
              <input
                type="text"
                placeholder="Enter voter address"
                value={voterAddress}
                onChange={(e) => setVoterAddress(e.target.value)}
                style={{ width: "400px", marginRight: "10px" }}
              />
              <input
                type="password"
                placeholder="Enter voter secret"
                value={voterSecret}
                onChange={(e) => setVoterSecret(e.target.value)}
                style={{ width: "300px", marginRight: "10px" }}
              />
              <button onClick={registerVoter}>Register</button>
            </div>
          ) : (
            <p style={{ color: "red", marginTop: "20px" }}>
              ⚠️ You are not the admin. Switch to admin account to register voters or manage voting.
            </p>
          )}

          {votingEnded && (
            <div style={{ marginTop: "30px" }}>
              <h2>Final Results</h2>
              <button onClick={fetchResults}>Show Results</button>
              {results.length > 0 && (
                <ul>
                  {results.map((r, i) => (
                    <li key={i}>
                      {r.name} - {r.votes} votes
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
