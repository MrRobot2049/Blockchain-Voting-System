// ignition/modules/Voting.js
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingModule", (m) => {
  const candidateNames = ["Alice", "Bob", "Charlie"]; // you can change these
  const voting = m.contract("Voting", [candidateNames]);
  return { voting };
});
