import { ReactNode } from 'react';
import { useContractRead, useContractWrite,usePrepareContractWrite  } from 'wagmi'
import{
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchNetwork,
  useBalance
} from 'wagmi'
import { useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address, connector, isConnected } = useAccount()
  // const { data: ensAvatar } = useEnsAvatar({ address })
  // const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } =
  useConnect()
  const { disconnect } = useDisconnect()
  const { data: eth } = useBalance({ address})
  const {address: accountData} = useAccount()
  const { data } = useBalance({ address, token: '0xf311bEa7328B81804F67F82156190329E38413E8', decimals: 18, formatted:true})
  
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>MuMuStake</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.githubusercontent.com/u/44767582?v=4'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{accountData}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>{data?.formatted} {data?.symbol}</MenuItem>
                  <MenuItem>{eth?.formatted} {eth?.symbol}</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}