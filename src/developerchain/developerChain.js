// src/taraxaTestnet.ts
var testtt = {
  id: 1337,
  name: "ganache developer",
  network: "developer",
  network_id: "5777",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:7545"]
    }
  },
  testnet: true
};
export{
  testtt
}