import Web3 from "web3";
import Fortmatic from 'fortmatic';


const fm = new Fortmatic('pk_test_E0D48681560608F0', 'kovan');


const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      const web3 = new Web3(fm.getProvider());
      window.web3 = web3
      // const web3 = new Web3(window.ethereum);
      try {
        console.log(web3.version)
        resolve(web3)
      }
      catch (error) {
          reject(error);
      }


      // // Modern dapp browsers...
      // if (window.ethereum) {
      //   console.log("window.ethereum exists")
      //   const web3 = new Web3(window.ethereum);
      //   try {
      //     // Request account access if needed
      //     await window.ethereum.enable();
      //     // Acccounts now exposed
      //     resolve(web3);
      //   } catch (error) {
      //     reject(error);
      //   }
      // }
      // // Legacy dapp browsers...
      // else if (window.web3) {
      //   // Use Mist/MetaMask's provider.
      //   console.log("window.web3 exists")
      //   const web3 = window.web3;
      //   console.log("Injected web3 detected.");
      //   resolve(web3);
      // }
      // // Fallback to localhost; use dev console port by default...
      // else {
      //   const provider = new Web3.providers.HttpProvider(
      //     "http://127.0.0.1:8545"
      //   );
      //   const web3 = new Web3(provider);
      //   console.log("No web3 instance injected, using Local web3.");
      //   resolve(web3);
      // }
    });
  });

export default getWeb3;
