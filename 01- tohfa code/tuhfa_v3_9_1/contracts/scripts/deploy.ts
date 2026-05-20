import { ethers } from "hardhat";

async function main() {
  const C = await ethers.getContractFactory("Collectible");
  const c = await C.deploy("Tuhfa Collectible", "TUHF");
  await c.deployed();
  console.log("Collectible deployed:", c.address);
}

main().catch((e)=>{ console.error(e); process.exit(1); });
