import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useBalance,
 } from 'wagmi'
 
 export function Profile() {
  const { address, connector, isConnected } = useAccount()
  // const { data: ensAvatar } = useEnsAvatar({ address })
  // const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } =
  useConnect()
  const { disconnect } = useDisconnect()
  const { data: eth } = useBalance({ address})
  const { data } = useBalance({ address, token: '0xf311bEa7328B81804F67F82156190329E38413E8', decimals: 18, formatted:true})
  
 
  if (isConnected) {
    // console.log(connector);
    // console.log(eth)
    return (
    <div>
    {/* <div>{ensName ? `${ensName} (${address})` : address}</div> */}
    <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>
    <div>
      Balance: {eth?.formatted} {eth?.symbol}
    </div>
    </div>
    )
  }
 
  return (
    <div>
    {/* {connectors.map((connector) => (
    <button
    disabled={!connector.ready}
    key={connector.id}
    onClick={() => connect({ connector })}
    >
    {connector.name}
    {!connector.ready && ' (unsupported)'}
    {isLoading &&
    connector.id === pendingConnector?.id &&
    ' (connecting)'}
    </button>
    ))}
  
    {error && <div>{error.message}</div>} */}
    </div>
  )
 }
 