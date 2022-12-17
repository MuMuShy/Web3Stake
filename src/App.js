import logo from './logo.svg';
import './App.css';
import { useContractRead, useContractWrite,usePrepareContractWrite  } from 'wagmi'

import { Profile } from './Profile';

import { Card, CardHeader, CardBody, CardFooter, Image, Input } from '@chakra-ui/react'
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
  useDisclosure,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  CloseButton
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
import { BigNumber } from 'ethers';
const stakeAddress = '0xb34c04509D0874f699cCCf9d32CF7CB4D56fdCa9'
const abi = [
	{
		"inputs": [],
		"name": "cancleStake",
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
function App() {
	const {
		isOpen: isVisible,
		onClose,
		onOpen,
	} = useDisclosure({ defaultIsOpen: false })
  const [errorMessage,setErrorMessage ] = useState('');
  const [stakeValue, setstakeValue] = useState('');
  const handleStakeValueChange = (event) => setstakeValue(event.target.value);

  const { data, isError, isLoading, write } = useContractWrite({
    address: stakeAddress,
    abi: abi,
    functionName: 'stakeToken',
    args: [stakeValue.toString()+"000000000000000000"],
    onError(error) {
		setErrorMessage('請確定輸入金額,第一次使用請點選右上角核准授權智能合約');
		onOpen();
    },
    onSuccess(success) {
      console.log('success??', success)
    }
  })

  const {write:claimReward} = useContractWrite({
	address: stakeAddress,
    abi: abi,
    functionName: 'claimReward',
    onError(error) {
	  console.log('Error!@@@@@@@@@@', error)
      setErrorMessage('請確認質押是否已結束 或是否有正確質押代幣');
	  onOpen();
    },
    onSuccess(success) {
      console.log('success??', success)
    }
  })

  

  const { write:writeCancle } = useContractWrite({
    address: stakeAddress,
    abi: abi,
    functionName: 'cancleStake',
    onError(error) {
		setErrorMessage('無法取消 請確認是否有正在質押');
		onOpen();
    },
    onSuccess(success) {
      console.log('success??', success)
    }
  })
  
  const { connect, connectors, error, isConnecting, pendingConnector} = useConnect()
  const [stakeAmount, setStakeAmount] = useState(0)
  const [stakeAmountFinal, setstakeAmountFinal] = useState(0)
  const [stakeRate, setStakeRate] = useState(0)
  const [stakeStart, setstakeStart] = useState(0)
  const [stakeEnd, setstakeEnd] = useState(0)
  const { disconnect } = useDisconnect()
  const {address: accountData} = useAccount()
  const connectWallet = () =>{
    connect({connector:connectors[0]})
  }
  

  //call contract
  // const { approve } = useContractWrite(config_approve)
  // const { data:stakeData, isLoading, isSuccess, write:stake } = useContractWrite(config)
  // const { approve } = useContractWrite(config_approve)
  // const { transform } = useContractWrite(config_transform)


  const {  data: functionData } = useContractRead({
    address: stakeAddress,
    abi: abi,
    functionName: 'stakeInfos',
    args: [accountData],
    onSuccess(data) {
    
      setStakeAmount((Number(data.amount["_hex"])/1000000000000000000).toFixed(2))
      var _preReward = ((Number(data.amount["_hex"])/1000000000000000000)+((Number(data.amount["_hex"])/1000000000000000000))*stakeRate/100).toFixed(2);
      setstakeAmountFinal(_preReward)
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
    address: stakeAddress,
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
      height="800" bg={'whiteAlpha.300'}
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
          MuMuStake
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
            <HStack>
            <Input placeholder='輸入質押金額' value={stakeValue} onChange={handleStakeValueChange}></Input>
            <Button size = 'lg' onClick={write} backgroundColor="#4c9d3b" color="#f0f8ff">質押</Button>
            </HStack>
            <HStack>
            <Text color={'white'} fontSize="2rem">目前質押: {stakeAmount}</Text><Avatar name='Prosper Otemuyiwa' src='https://mumu.tw/images/mumucoin.png' size={'md'}/>
            <Button size = 'lg' onClick={writeCancle} backgroundColor="#ff002e" color="#f0f8ff">取消質押(-10%fee)</Button>
            
            </HStack>
            
            <Text color={'white' } fontSize="1.5rem">利率(日息): {stakeRate} %</Text>
          </VStack>
          
        )}
      </HStack>
      <VStack>
        { accountData?(
				<VStack>
					<Text color={'white'}>質押開始時間: { stakeStart}</Text>
					<Text color={'white'}>質押結束時間: { stakeEnd}</Text>
					<Text color={'white'}>預計回報: {stakeAmountFinal} MuMu</Text>
					<Button size = 'md' onClick={claimReward} backgroundColor="#4c9d3b" color="#f0f8ff">領取</Button>
				</VStack>
				
				):(
				<VStack>
				</VStack>
				)
			
        }
		{isVisible?(
			<Alert status='error'>
			<AlertIcon />
			<Box>
				<AlertTitle>錯誤!</AlertTitle>
				<AlertDescription>
				{errorMessage}
				</AlertDescription>
			</Box>
			<CloseButton
				alignSelf='flex-start'
				position='relative'
				right={-1}
				top={-1}
				onClick={onClose}
			/>
			</Alert>
		) : (
			<></>
		)}
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
