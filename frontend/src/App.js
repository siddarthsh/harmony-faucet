import logo from './logo.svg';
import './App.css';
import packageJson from '../package.json';
import LoadButton from './LoadButton';
import AppExplanations from './AppExplanations';
import AccountManager from './controller/accountManager';
import faucetClaim from './controller/faucet';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from 'react-global-configuration';
import configuration from './config.json';
import HCaptcha from '@hcaptcha/react-hcaptcha';

config.set(configuration);

const accountManager = new AccountManager();

function App() {
    const [account, setAccount] = useState('Not connected');
    const [balance, setBalance] = useState(0);
    const [txLink, setTxLink] = useState('');
    const [captcha, setCaptcha] = useState('');

    return (
        <div className="App">
            <ToastContainer hideProgressBar={true} />
            <div className="App-banner">
                <img src="/logo192.png" className="App-logo" alt="logo" />
                <p className="App-title">Harmony Faucet</p>
            </div>
            <header className="App-header">
                <div className="Commands">
                    <LoadButton
                        text="Connect"
                        loadingText="Loading..."
                        hidden={account !== 'Not connected'}
                        onClick={() =>
                            accountManager.connect().then((account) => {
                                if (!account) {
                                    toast.error(
                                        `Wrong network: Please select Harmony mainnet first`
                                    );
                                } else {
                                    setAccount(account);
                                    accountManager
                                        .getBalance()
                                        .then((balance) => {
                                            setBalance(balance);
                                        });
                                }
                            })
                        }
                    />
                    <LoadButton
                        text={
                            Number(balance) >= config.get('maxAmount')
                                ? 'Balance too high'
                                : 'Receive'
                        }
                        loadingText="Sending..."
                        disabled={Number(balance) >= config.get('maxAmount')}
                        hidden={account === 'Not connected'}
                        onClick={() =>
                            faucetClaim(account)
                                .then((hash) => {
                                    toast.success('Transaction sent!');
                                    setTxLink(hash);
                                    setBalance(
                                        accountManager.getFormattedBalance(
                                            Number(
                                                accountManager.balance +
                                                    config.get('maxAmount')
                                            ),
                                            18
                                        )
                                    );
                                    setCaptcha('');
                                })
                                .catch((error) => {
                                    toast.error(
                                        `${error.response.data.err.message} 🙅`
                                    );
                                })
                        }
                    />
                </div>
                <form id="receive" action="" method="POST">
                    <HCaptcha
                        theme="dark"
                        sitekey={config.get('hcaptchasitekey')}
                        onVerify={(token, ekey) => {
                            setCaptcha(token);
                        }}
                    />
                </form>
                <p hidden={account === 'Not connected'}>{account}</p>
                <p hidden={account === 'Not connected'}>
                    {'Your balance: ' + String(balance)}
                </p>
                <a
                    hidden={txLink === ''}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={txLink}
                >
                    {txLink}
                </a>
                <br></br>
                <AppExplanations></AppExplanations>
                <div className="App-footer">
                    <p>
                        A modest Web App built by{' '}
                        <a
                            href="https://github.com/siddarthsh"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Siddarth
                        </a>{' '}
                        with React, hosted on Github. v
                        {`${packageJson.version}`}.{' '}
                        <a href="https://github.com/siddarthsh/harmony-faucet/">
                            PRs welcomed and appreciated ✨
                        </a>
                    </p>
                    <p>
                        Harmony/ONE donation:{' '}
                        <a
                            h
                            href="https://explorer.harmony.one/#/address/one10u35m0pvfuj548mq552389y92rqcn4nk7gkyvl"
                            target="_blanc"
                            rel="noopener noreferrer"
                        >
                            one10u35m0pvfuj548mq552389y92rqcn4nk7gkyvl
                        </a>
                    </p>
                </div>
            </header>
        </div>
    );
}

export default App;
