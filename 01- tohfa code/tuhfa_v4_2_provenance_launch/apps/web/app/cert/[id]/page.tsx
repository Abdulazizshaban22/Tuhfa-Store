import { JsonRpcProvider, Contract } from 'ethers';
import abi from '@/provenance/abi/TuhfaNFT.json';

export default async function CertificatePage({ params }: { params: { id: string } }){
  const id = params.id;
  const rpc = process.env.CHAIN_RPC_URL!;
  const addr = process.env.CONTRACT_ADDRESS!;

  const provider = new JsonRpcProvider(rpc);
  const contract = new Contract(addr, abi as any, provider);

  let owner = '0x'; let tokenUri = '';
  try{
    owner = await contract.ownerOf(id);
    tokenUri = await contract.tokenURI(id);
  }catch(e){ /* token may not exist yet */ }

  return (
    <main style={{padding:'24px'}}>
      <h1>Certificate — Token #{id}</h1>
      <p><b>Owner:</b> {owner}</p>
      <p><b>tokenURI:</b> {tokenUri}</p>
      <hr/>
      <p>Checksum (SHA-256): stored in token metadata or XMP (GLB).</p>
      <p>Chain: Polygon Amoy (80002)</p>
    </main>
  );
}