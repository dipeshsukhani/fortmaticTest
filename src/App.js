import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  networkNames = {
    42: "Kovan",
    3: "Ropsten",
    4: "Rinkeby",
    1: "Mainnet"
  }
  state = { storageValue: 0, web3: null, accounts: null, contract: null, networkNames: this.networkNames, networkConnected: null };
  
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      this.setState({
        networkConnected: this.networkNames[networkId]
      })
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
    const resp1 = await contract.methods.storedData().call();

    // Update state with the result.
    this.setState({ storageValue: resp1 });
  };

  updatedValue = async () => {
    let contract = this.state.contract;
    let accounts = this.state.accounts;
    console.log("calling the function")
    let curVal=this.state.storageValue;
    let val2Set = Number(curVal)+1;
    await contract.methods.set(val2Set).send({ from: accounts[0] });
  }

  handleClick = async () => {
    await this.updatedValue();
    window.location.reload();
    // let updatedResp = await contract.methods.storedData().call()
    // this.setState({ storageValue: updatedResp });
    // window.location.reload();
  }

  shoot = async() => {
    console.log("whatsup")
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h2>Smart Contract Example</h2>
        <div>You are connected to the {this.state.networkConnected} network</div>
        <br/>
        <div>Your current Ethereum account is: {this.state.accounts}</div>
        <br />
        <div>The currently stored value in the Smart Contract is: {this.state.storageValue}</div>
        <p>
          Press the button below to increase the value of the storage variable by 1.
        </p>
        
        {/* <div>The stored value is: {this.state.storageValue}</div> */}
        <button onClick={this.handleClick}>Take the Shot!</button>
      </div>
    );
  }
}

export default App;
