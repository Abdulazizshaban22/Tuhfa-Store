
export default function Cert({ params }:{ params:{ id:string } }){
  return (
    <main style={{padding:24}}>
      <h1>Certificate — Token #{params.id}</h1>
      <p>تعرض هذه الصفحة بيانات المالك و tokenURI (اربطها بعقد ERC-721 كما في v4.2).</p>
    </main>
  );
}
