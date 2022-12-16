import logo from './logo.svg';
import './App.css';
import { useContractRead, useContractWrite,usePrepareContractWrite  } from 'wagmi'

import { Profile } from './Profile';

import { Card, CardHeader, CardBody, CardFooter, Image } from '@chakra-ui/react'
import { useState } from 'react';
import { format } from "date-fns";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import{
  Box,
  Button,
  HStack,
  Select,
  Text,
  VStack,
}from "@chakra-ui/react"
import{
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchNetwork,
} from 'wagmi'

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'

function App() {
  const abi = [
    {
      "inputs": [
        {
          "internalType": "contract Token",
          "name": "_tokenAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Claimed",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "claimReward",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Staked",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "stakeAmount",
          "type": "uint256"
        }
      ],
      "name": "stakeToken",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "addressStaked",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTokenExpiry",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "interestRate",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "planDuration",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "planExpired",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "stakeInfos",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "startTS",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endTS",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "claimed",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalStakers",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const tokenabi = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
  // const { config_approve } = usePrepareContractWrite({
  //   address: '0x42aA60a832F4e64323FEE174c5f43F37c76B55ed',
  //   abi: tokenabi,
  //   functionName: 'approve',
  //   args: ['0x39891c6eF53f3AFf6e94b0481443F94c3a619142',100000000],
  //   onError(error) {
  //     console.log('Error', error)
  //   },
  //   onSuccess(success) {
  //     console.log('success', success)
  //   }
  // })
  // const { config_transform } = usePrepareContractWrite({
  //   address: '0x42aA60a832F4e64323FEE174c5f43F37c76B55ed',
  //   abi: tokenabi,
  //   functionName: 'transfer',
  //   args: ['0x593D194416B7Fc00eb15De2e73513036b38c1D4D',10000],
  //   onError(error) {
  //     console.log('Error', error)
  //   },
  //   onSuccess(success) {
  //     console.log('success', success)
  //   }
  // })
  // const {config} = usePrepareContractWrite({
  //   address: '0x39891c6eF53f3AFf6e94b0481443F94c3a619142',
  //   abi: abi,
  //   functionName: 'stakeToken',
  //   args: [1000],
  //   onError(error) {
  //     console.log('Error', error)
  //   },
  //   onSuccess(success) {
  //     console.log('success', success)
  //   }
  // })
  
  const { connect, connectors, error, isConnecting, pendingConnector} = useConnect()
  const [stakeAmount, setStakeAmount] = useState(0)
  const [stakeRate, setStakeRate] = useState(0)
  const [stakeStart, setstakeStart] = useState(0)
  const [stakeEnd, setstakeEnd] = useState(0)
  const { disconnect } = useDisconnect()
  const {address: accountData} = useAccount()
  const connectWallet = () =>{
    connect({connector:connectors[0]})
  }
  const disconnectWallet = () =>{
    disconnect()
  }

  //call contract
  // const { approve } = useContractWrite(config_approve)
  // const { data:stakeData, isLoading, isSuccess, write:stake } = useContractWrite(config)
  // const { approve } = useContractWrite(config_approve)
  // const { transform } = useContractWrite(config_transform)


  const {  data: functionData } = useContractRead({
    address: '0x39891c6eF53f3AFf6e94b0481443F94c3a619142',
    abi: abi,
    functionName: 'stakeInfos',
    args: [accountData],
    onSuccess(data) {
      console.log('Success', data)
      setStakeAmount(parseInt(data.amount["_hex"], 16))
      var date = new Date(parseInt(data.startTS["_hex"], 16)*1000);
      var formattedDate = format(date, "MM-dd, yyyy H:mma");
      setstakeStart(formattedDate)
      date = new Date(parseInt(data.endTS["_hex"], 16)*1000);
      formattedDate = format(date, "MM-dd, yyyy H:mma");
      setstakeEnd(formattedDate)
    },
    onError(error) {
      console.log('Error', error)
    },
    watch: true
  })

  const {  data: rateinfo } = useContractRead({
    address: '0x39891c6eF53f3AFf6e94b0481443F94c3a619142',
    abi: abi,
    functionName: 'interestRate',
    onSuccess(data) {
      console.log('Success', data)
      setStakeRate(rateinfo);
    },
    onError(error) {
      console.log('Error', error)
    },
    watch: true
  })


  

  
  

  return (

    <VStack
      justifyContent = "center"
      alignItems="center"
      h="100vh" bg={'whiteAlpha.300'}
      spacing={4}
    >
      <Card backgroundColor='#000000'>
      <CardBody>
      <Image
      src='https://i.pinimg.com/736x/d2/aa/10/d2aa10658102d328859d6758b836dbeb.jpg'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
        <Text
          color={'white'}
          fontSize={'3rem'}
          fontWeight={'bold'}
          align={'center'}
        >
          MuMuSwap
        </Text>
        <HStack
        justifyContent = "center"
        alignItems="center"
        spacing={4}
      >
        {!accountData?(
          <HStack>
            <Button size = 'lg' onClick={connectWallet}>連結錢包</Button>
          </HStack>
          
        ):(
          <VStack>
            <Button size = 'lg' onClick={disconnectWallet} backgroundColor="#ff002e" color="#f0f8ff">斷開錢包</Button>
            {/* <Button size = 'lg' onClick={stake}>質押</Button> */}
            <HStack>
            <Text color={'white'} fontSize="2rem">目前質押: {stakeAmount}</Text>
            <Avatar name='Prosper Otemuyiwa' src='https://mumu.tw/images/mumucoin.png' />
            </HStack>
            
            <Text color={'white' } fontSize="1.5rem">利率: {stakeRate} %</Text>
          </VStack>
          
        )}
      </HStack>
      <VStack>
        { accountData?(
          <VStack>
            <Text color={'white'}>質押開始時間: { stakeStart}</Text>
            <Text color={'white'}>質押結束時間: { stakeEnd}</Text>
            <Text color={'white'}>預計回報: {stakeAmount+(stakeAmount*stakeRate/100)} MuMu</Text>
          </VStack>
        ):(
          <VStack>
          </VStack>
        )
        }
      </VStack>
      </CardBody>
      </Card>
      <VStack
        justifyContent = "center"
        alignItems="center"
        padding="10px 0"
      >
        

      </VStack>
      <VStack>
      </VStack>

    </VStack>

  );
}

export default App;
