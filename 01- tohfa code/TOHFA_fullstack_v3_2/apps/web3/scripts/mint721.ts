// Usage: ts-node mint721.ts <rpc> <privateKey> <contractAddress> <to> <tokenURI>
import { Wallet, JsonRpcProvider, Contract } from 'ethers';
async function main() {
  const [rpc, pk, addr, to, uri] = process.argv.slice(2);
  if (!rpc || !pk || !addr || !to || !uri) {
    console.error("Usage: ts-node mint721.ts <rpc> <privateKey> <contractAddress> <to> <tokenURI>");
    process.exit(1);
  }
  const provider = new JsonRpcProvider(rpc);
  const wallet = new Wallet(pk, provider);
  const abi = [ "function safeMint(address to, string tokenURI_) external returns (uint256)" ];
  const c = new Contract(addr, abi, wallet);
  const tx = await c.safeMint(to, uri);
  console.log("Mint tx:", tx.hash);
  const r = await tx.wait();
  console.log("Mined in block", r.blockNumber);
}
main().catch(e=>{ console.error(e); process.exit(1); });
