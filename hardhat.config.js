require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
};
// require("@nomicfoundation/hardhat-toolbox");

// module.exports = {
//   solidity: "0.8.20",
//   networks: {
//     ganache: {
//       url: "http://127.0.0.1:7545", // RPC URL shown in Ganache
//       accounts: [
//         "0x963fc545ff53148f5397993c2b5aa5b72121a468adddd14a1d76a690b6962f8e"
//       ]
//     }
//   }
// };
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:8545", // 👈 replace with Ganache RPC SERVER
      chainId: 1337, // 👈 replace with your Ganache chainId
      accounts: [
        "0x______"
      ],
    },
  },
};
