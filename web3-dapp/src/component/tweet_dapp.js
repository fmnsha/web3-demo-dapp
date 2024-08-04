"use client"

import Web3 from "web3";
import { useEffect, useRef, useState } from "react"
import { tweetsABI, tweetsContractAddr } from '../constants/config';

export default function TweetDapp() {

  const [currentAccount, setCurrentAccount] = useState()
  const [tweets, setTweets] = useState([])
  const [web3, setWeb3] = useState(null)
  const [contract, setContract] = useState(null)

  useEffect(() => {
    const web3 = new Web3(window.ethereum || new Web3.providers.HttpProvider("http://localhost:7545"))
    const contract = new web3.eth.Contract(tweetsABI, tweetsContractAddr)
    setWeb3(web3);
    setContract(contract);
  }, [])

  useEffect(() => {
    showAccTweets()
  }, [currentAccount])


  useEffect(() => {
    checkIfMetamaskIsInstalled();
    checkIfAccountChanged();
  }, []);

  const checkIfMetamaskIsInstalled = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log(`Install Metamask wallet`);
      } else {
        console.log(`we have ethereum object ${ethereum}`);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // check if metamask account changed
  const checkIfAccountChanged = async () => {
    try {
      const { ethereum } = window;
      ethereum.on("accountsChanged", (accounts) => {
        console.log("Account changed to:", accounts[0]);
        setCurrentAccount(accounts[0]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("get metamask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("connected!", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    try {

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0]
      console.log("form acc", account)

      await contract.methods.Add(formJson.tweet).send({ from: account, gas: '2000000' }).then(function (receipt) {
        // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
        console.log(receipt)
      });

      showAccTweets()
    } catch (e) {
      console.log(e)
    }
  }

  async function showAccTweets() {
    try {


      if (currentAccount) {
        let tweets = await contract.methods.getTweets().call({ from: currentAccount })
        setTweets(tweets)
      }

    } catch (e) {
      console.log(e)
    }
  }

  async function getPastEvents() {
    // const linkedContract = new web3.eth.Contract(tweetsABI, tweetsContractAddr);
    contract.getPastEvents('TweetCreated', {
      //filter: { sender: addr }, // Optional event filtering
      fromBlock: 0, // Start block number
      toBlock: 'latest' // End block number
    })
      .then(function (events) {
        // Process the retrieved events
        console.log(events);
      })
      .catch(function (error) {
        // Handle errors
        console.error(error);
      });
  }

  async function eventSubscription() {
    // const linkedContract = new web3.eth.Contract(tweetsABI, tweetsContractAddr);
    contract.events.TweetCreated()
      .on('data', function (event) {
        // Handle the received event data
        console.log(event);
      })
      .on('error', function (error) {
        // Handle errors
        console.error(error);
      });
  }

  return (

    <div>

      <button disabled={currentAccount} onClick={() => { connectWallet() }}>Connect</button>

      <form method="post" onSubmit={handleSubmit}>

        <label className="inline-grid">

          <textarea
            name="tweet"
            defaultValue="I really enjoyed biking yesterday!"
            rows={4}
            cols={40}
          />
        </label>
        <hr />
        <button type="submit">Save post</button>
        {tweets.map((t, i) => <div key={i}>
          <h1>{t.content}</h1>
        </div>)}

      </form>
    </div>
  )
}