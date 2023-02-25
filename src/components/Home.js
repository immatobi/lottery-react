import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

//Fix: https://github.com/ChainSafe/web3.js#web3-and-create-react-app
import web3 from '../components/helpers/web3'
import lottery from '../components/contract/lottery'

const Home = (props) => {

    const [manager, setManager] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [players, setPlayers] = useState([]);
    const [balance, setBalance] = useState(9);

    useEffect( () => {

        getAccounts()
        getManager();

    }, [])

    const getAccounts = async () => {
        await web3.eth.getAccounts().then((resp) => {
            setAccounts(resp)
        });
    }

    const getManager = async () => {
        const manager = await lottery.methods.manager().call();
        setManager(manager);

        const players = await lottery.methods.getPlayers().call();
        setPlayers(players);

        const bal = await web3.eth.getBalance();
        setBalance(bal > 0 ? bal : 0);
    }

    return(
        <>
            <h1 onClick={(e) => { console.log(balance) }}>Lottery Contract</h1>
            <p>This contract is managed by { accounts[0] }</p>
        </>
    )

}

export default Home