import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function SmallWithNavigation() {
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Stack direction={'row'} spacing={6}>
            <Link href={'https://goerli.etherscan.io/address/0xf9f4bb1adcc0527fca576532ea784ee90c1d7900#readContract'} target='_blank'>MuMuToken On Etherscan(testnet)</Link>
            <Link href={'https://goerli.etherscan.io/address/0xb34c04509d0874f699cccf9d32cf7cb4d56fdca9#code'} target='_blank'>Stake Contract Etherscan(testnet)</Link>
            <Link href={'https://mumu.tw'} target='_blank'>Contact</Link>
          </Stack>
          <Text>© 2022 MuMu. All rights reserved</Text>
        </Container>
      </Box>
    );
  }