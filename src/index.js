import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WithSubnavigation from './components/header';
import SmallWithNavigation from './components/footer'
import reportWebVitals from './reportWebVitals';
import CollapsibleExample from './components/rwdheader';
import { ChakraProvider, Container } from '@chakra-ui/react'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WagmiConfig, createClient, configureChains, mainnet, goerli } from 'wagmi'

import { testtt } from './developerchain/developerChain';

import { getDefaultProvider } from 'ethers'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  connectors:[
    new MetaMaskConnector({ goerli }),
  ],
  provider,
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
    <ChakraProvider>
        <WithSubnavigation></WithSubnavigation>
        {/* <CollapsibleExample></CollapsibleExample> */}
        <App/>
        <SmallWithNavigation></SmallWithNavigation>
    </ChakraProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
