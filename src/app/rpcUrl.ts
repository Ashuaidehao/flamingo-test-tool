class RpcUrl {
  Url: string;
  Name: string;
}

export const RpcUrls: RpcUrl[] = [
  { Url: "http://localhost:60002", Name: "Local" },
  { Url: "http://seed2t.neo.org:11332", Name: "flamtest" },
  { Url: "http://seed3.ngd.network:20332", Name: "testnet" },
  { Url: "http://seed1.ngd.network:10332/", Name: "Mainnet" },
];
