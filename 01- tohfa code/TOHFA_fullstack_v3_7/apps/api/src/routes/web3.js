import express from 'express';
import { PrismaClient } from '@prisma/client';
import { createWalletClient, http } from 'viem';
import { polygonMumbai } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

const prisma = new PrismaClient();
const router = express.Router();

const ABI = [
  { "inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"string","name":"uri","type":"string"}], "name":"mintTo","outputs":[], "stateMutability":"nonpayable","type":"function"}
];

router.post('/mint', async (req,res) => {
  const { productId, toAddress, tokenURI } = req.body;
  if(!productId || !toAddress || !tokenURI) return res.status(400).json({ error:'missing fields'});

  const account = privateKeyToAccount((process.env.WALLET_PRIVATE_KEY||'0x'+'1'.)?.toString());
  const client = createWalletClient({
    account, chain: polygonMumbai, transport: http(process.env.CHAIN_RPC_URL)
  });

  try {
    const hash = await client.writeContract({
      address: process.env.CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'mintTo',
      args: [toAddress, tokenURI]
    });

    const rec = await prisma.web3Mint.create({
      data: { productId, toAddress, txHash: hash, tokenURI }
    });
    res.json({ ok: true, txHash: hash, record: rec });
  } catch (e) {
    res.status(500).json({ ok:false, error: e.message });
  }
});

export default router;