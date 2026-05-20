import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const Tuhfa = await ethers.getContractFactory("TuhfaNFT");
  const tuhfa = await Tuhfa.deploy("Tuhfa Provenance", "TUHFA");
  await tuhfa.waitForDeployment();

  const addr = await tuhfa.getAddress();
  console.log("TuhfaNFT deployed at:", addr);
}
main().catch((e)=>{ console.error(e); process.exit(1); });