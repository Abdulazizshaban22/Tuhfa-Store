/* Certificate page — fetches tokenURI JSON (if HTTP) */
import { JsonRpcProvider, Contract } from 'ethers';
import abi from '@/provenance/abi/TuhfaNFT.json';

async function fetchJsonMaybe(url: string){
  try{
    if(!url || !url.startsWith('http')) return null;
    const res = await fetch(url, { cache: 'no-store' });
    if(!res.ok) return null;
    return await res.json();
  }catch{ return null; }
}

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

  const meta = await fetchJsonMaybe(tokenUri);

  return (
    <main style={{padding:'24px', maxWidth: 860}}>
      <h1>Certificate — Token #{id}</h1>
      <p><b>Owner:</b> {owner}</p>
      <p><b>tokenURI:</b> {tokenUri}</p>
      {meta && (
        <section style={{marginTop: 16}}>
          <h3>Metadata</h3>
          <pre style={{background:'#f7f7f7', padding:12, borderRadius:8}}>{JSON.stringify(meta, null, 2)}</pre>
        </section>
      )}
      <hr/>
      <p>Checksum (SHA-256): see <code>checksum_sha256</code> in token metadata or XMP.</p>
      <p>Chain: Polygon Amoy (80002)</p>
    </main>
  );
}