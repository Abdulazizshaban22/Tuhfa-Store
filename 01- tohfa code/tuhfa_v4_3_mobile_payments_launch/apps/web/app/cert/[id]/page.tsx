
export default function Cert({ params }:{ params:{ id:string } }){
  return (
    <main style={{padding:24}}>
      <h1>Certificate — Token #{params.id}</h1>
      <p>This page should display owner and tokenURI from chain (wired in v4.2).</p>
    </main>
  );
}
