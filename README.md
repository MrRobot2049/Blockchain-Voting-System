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
```
Blockchain-Voting-System/
│── contracts/          # Solidity smart contracts (Voting.sol)
│── ignition/           # Hardhat Ignition deployment modules
│── voting-dapp/        # React frontend (MetaMask + ethers.js)
│   ├── src/
│   │   ├── App.js      # Main React frontend
│   │   ├── config.js   # Contract address + ABI
│   │   └── contracts/  # ABI JSON files
│   ├── package.json    # frontend dependencies
│   └── ...
│── package.json        # backend (Hardhat) dependencies
│── hardhat.config.js
│── README.md
│── .gitignore
```

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

### 🔹 Prerequisites
- [Node.js](https://nodejs.org/) (>= 16.x)  
- [MetaMask](https://metamask.io/) (Browser Extension)  
- [Ganache](https://trufflesuite.com/ganache/) (Local Ethereum blockchain)  
- [Hardhat](https://hardhat.org/) (Contract development framework)  

---

### 1. Clone Repository
```bash
git clone https://github.com/your-username/Blockchain-Voting-System.git
cd Blockchain-Voting-System
```

### 2. Install Backend (Hardhat) Dependencies
```bash
npm install
```

### 3. Install Frontend (React) Dependencies
```bash
cd voting-dapp
npm install
```

### 4. Compile Smart Contract
```bash
npx hardhat compile
```

### 5. Configure Hardhat for Ganache
In `hardhat.config.js`:
```js
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: ["0xYOUR_ADMIN_PRIVATE_KEY"]
    },
  },
};
```

### 6. Deploy Smart Contract
```bash
npx hardhat ignition deploy ./ignition/modules/Voting.js --network ganache
```

If redeploy needed:
```bash
rm -rf ignition/deployments/chain-1337
npx hardhat ignition deploy ./ignition/modules/Voting.js --network ganache
```

### 7. Copy ABI to Frontend
```bash
mkdir -p voting-dapp/src/contracts
cp artifacts/contracts/Voting.sol/Voting.json voting-dapp/src/contracts/Voting.json
```

### 8. Update Frontend Config
`voting-dapp/src/config.js`:
```js
import VotingArtifact from "./contracts/Voting.json";

const config = {
  contractAddress: "0xPUT_YOUR_DEPLOYED_ADDRESS_HERE",
  contractABI: VotingArtifact.abi
};

export default config;
```

### 9. Start the Frontend
```bash
cd voting-dapp
npm start
```
Visit 👉 `http://localhost:3000`

---

## 🔹 Workflow

1. **Admin**  
   - Registers voters with address + secret.  
   - Starts election.  

2. **Voter**  
   - Connects wallet via MetaMask.  
   - Casts vote using secret.  

3. **Admin**  
   - Ends election.  

4. **Anyone**  
   - Views final results.  

---

## 🔎 Troubleshooting

- **Cannot connect to Ganache** → Check Ganache RPC URL/chainId in `hardhat.config.js`.  
- **BAD_DATA error** → ABI/address mismatch, re-copy `Voting.json` and update `config.js`.  
- **CALL_EXCEPTION (vote failed)** → Ensure voting started, voter registered, correct secret, not already voted.  
- **ENS error** → Only use valid `0x...` addresses.  
- **MetaMask pending requests** → Close popups, reconnect wallet.  

---

## 📜 License
MIT License © 2025 Goutham Naroju  

---

## ✨ Author
👨‍💻 **Goutham Naroju**  
B.Tech Mathematics & Computing, IIT Ropar  
