import { useState } from 'react';
import ContractABI from '../ABI/SubscriptionToken';
import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x25c6e822cad079fbbe986a74abc5d0bbee6fe942";

async function subscribe() {
    if (typeof window !== 'undefined') {
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        console.log(account);
        await web3.eth.sendTransaction({ from: account, to: contractAddress, value: 10 ** 16 });
    }
}
export default () => {
    const login = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        await subscribe();
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div >
            <form className="signin-form">
                <img src="/static/avatar.png" />
                <label>Username</label>
                <input onChange={(e) => { setPassword(e.target.value) }} type="password" />
                <label>Email</label>
                <input onChange={(e) => { setEmail(e.target.value); }} />
                <label>Password</label>
                <input onChange={(e) => { setPassword(e.target.value) }} type="password" />
                <button onClick={login}>Sign in</button>
            </form>
            <style>{`
                .signin-form > img {
                    width: 3em;
                    margin: 0 auto;
                    display: block;
                    margin-top: 0;
                    margin-bottom: .5em;
                }
                .signin-form {
                    box-shadow: 1px 1px 10px;
                    width: fit-content;
                    padding: 1.5em 1.5em; }
                .signin-form > input {
                        display: block;
                        padding: .5em 2em;
                        border: 1px solid #3d7cc4;
                        border-radius: 1em;
                        margin-bottom: 1em; }
                .signin-form > label {
                        font-size: .9em; }
                .signin-form > button {
                        padding: .5em 1em;
                        border: none;
                        background-color: #166aca;
                        color: white;
                        display: block;
                        margin: 0 auto;
                        width: 100%;
                        cursor: pointer;
                        transition: all .2s linear; }
                .signin-form > button:hover {
                        background-color: #0c3a6e;
                        transform: scale(1.05, 1.05); }
            `}</style>
        </div>
    )
}