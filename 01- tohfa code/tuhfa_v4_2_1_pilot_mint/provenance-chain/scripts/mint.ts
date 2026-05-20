import { ethers } from "hardhat";

const TO = process.env.MINT_TO || "";
const TOKEN_URI = process.env.TOKEN_URI || "https://tuhfa.app/ipfs/metadata.json";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "";

async function main() {
  if(!CONTRACT_ADDRESS) throw new Error("Missing CONTRACT_ADDRESS");
  if(!TO) throw new Error("Missing MINT_TO");

  const nft = await ethers.getContractAt("TuhfaNFT", CONTRACT_ADDRESS);
  const tx = await nft.mintTo(TO, TOKEN_URI);
  const receipt = await tx.wait();
  console.log("Mint tx:", receipt?.hash);
}
main().catch((e)=>{ console.error(e); process.exit(1); });