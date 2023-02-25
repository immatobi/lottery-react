import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

//Fix: https://github.com/ChainSafe/web3.js#web3-and-create-react-app
import web3 from '../components/helpers/web3'
import lottery from '../components/contract/lottery'

class HomeComp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            accounts: [],
            manager: '',
            players: [],
            balance: '',
            value: '',
            message: ''
        }
    }
    
    async componentDidMount(){

        await this.getAccounts();
        this.setDefaults();

    }

    getAccounts = async () => {
        await web3.eth.getAccounts().then((resp) => {
            this.setState({ accounts: resp });
        });
    }

    setDefaults = async () => {

        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);
        
        this.setState({ manager, players, balance });
    }

    onSubmit = async (e) => {

        if(e) { e.preventDefault() }

        this.setState({ message: 'Waiting on transaction' });

        await lottery.methods.enter().send({
            from: this.state.accounts[0],
            value: web3.utils.toWei(this.state.value, 'ether')
        });

        this.setState({ message: 'You have been entered!' });

    }

    pickWinner = async (e) => {

        if(e) { e.preventDefault() }

        this.setState({ message: 'Picking a winner...' });

        await lottery.methods.pickWinner().send({
            from: this.state.accounts[0]
        });

        this.setState({ message: 'Winner has been picked!' });

    }

    render(){

        return(

            <>
                <div style={{ padding: '2rem 2rem' }}>
                    <h1 onClick={(e) => { console.log(this.state.manager) }}>Lottery Contract</h1>

                    <p>
                        This contract is managed by { this.state.manager }.
                    </p>

                    <p>
                        There are currently { this.state.players.length } people entered, 
                        competing to win { web3.utils.fromWei(this.state.balance, 'ether') } ether.
                    </p>

                    <hr />

                    <form onSubmit={(e) => this.onSubmit(e) }>
                        <h4>Want to try your luck?</h4>
                        <div>
                            <label>Ether amount</label>
                            <input value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
                        </div>
                        <button>Enter</button>
                    </form>
                    <hr />
                    <h4>Ready to pick a winner?</h4>
                    <button onClick={(e) => this.pickWinner(e)}>Pick a Winner!</button>
                    <hr />
                    <h3>{ this.state.message }</h3>
                </div>

            </>

        )

    }


}

export default HomeComp;