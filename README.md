# 🗳️ Blockchain Voting DApp

A decentralized voting platform built with **Ethereum smart contracts** and a **React.js frontend**.  
This project ensures secure, transparent, and tamper-proof elections by leveraging blockchain technology.

---

## 🚀 Features
- **Role-based access**  
  - Admin manages voter registration and election lifecycle.  
  - Voters cast exactly one vote using their assigned secret.  

- **Voting workflow**  
  - Admin registers voters with hashed secrets.  
  - Admin starts and ends the election.  
  - Voters cast votes with their secret.  
  - Results are immutable and publicly auditable.  

- **Security**  
  - Secrets are hashed with keccak256, not stored in plain text.  
  - One-vote-per-user enforced at contract level.  
  - Fully tamper-resistant on blockchain.  

- **Frontend**  
  - React.js + Ethers.js + MetaMask integration.  
  - Real-time updates of candidates, votes, and results.  

---

## 🛠️ Tech Stack
- **Blockchain**: Ethereum (Ganache local blockchain)  
- **Smart Contracts**: Solidity, Hardhat (Ignition deployment)  
- **Frontend**: React.js, Ethers.js, MetaMask  
- **Tools**: Node.js, VS Code  

---

## 📂 Project Structure
    Blockchain-Voting-System/
    │── contracts/ # Solidity smart contracts (Voting.sol)
    │── ignition/ # Hardhat Ignition deployment modules
    │── voting-dapp/ # React frontend (MetaMask + ethers.js)
    │ ├── src/
    │ │ ├── App.js # Main React frontend
    │ │ ├── config.js # Contract address + ABI
    │ │ └── contracts/ # ABI JSON files
    │ ├── package.json # frontend dependencies
    │ └── ...
    │── package.json # backend (Hardhat) dependencies
    │── hardhat.config.js
    │── README.md
    │── .gitignore


---

## ⚡ How It Works
1. **Admin**
   - Deploys contract with candidate names.  
   - Registers voters with Ethereum addresses + secrets.  
   - Starts and ends voting.  

2. **Voter**
   - Connects wallet via MetaMask.  
   - Enters their secret and votes for a candidate.  
   - Can only vote once.  

3. **Results**
   - Visible after voting ends.  
   - Immutable and transparent.  

---

## 🖥️ Setup & Run

### Prerequisites
- [Node.js](https://nodejs.org/)  
- [MetaMask](https://metamask.io/) (Browser Extension)   
- [Ganache](https://trufflesuite.com/ganache/)  
- [Hardhat](https://hardhat.org/)  

---

### 1. Clone Repository
```bash
git clone https://github.com/MrRobot2049/Blockchain-Voting-System.git

cd Blockchain-Voting-System
```
### 2. Install Dependencies
Install backend (Solidity + Hardhat-related packages) dependencies from root package.json
```bash
npm install 

```
Install frontend (React, Ethers.js, and other frontend libraries) dependencies from voting-dapp/package.json
```bash
cd voting-dapp
npm install
```
### 3. Compile & Deploy Smart Contract
Start Ganache (default: http://127.0.0.1:7545).
```bash
npx hardhat compile
npx hardhat ignition deploy ignition/modules/Voting.js --network ganache
```
Copy the deployed contract address into:
voting-dapp/src/config.js
### 4. Run React Frontend
```bash
cd voting-dapp
npm start
```
## 📜 License
MIT License © 2025 Goutham Naroju
