export default function Immersive() {
  return (
    <main className="p-0">
      <iframe src="/museum/immersive/aframe.html" style={{border:0, width:'100%', height:'90vh'}} />
      <div style={{padding:16}}>
        <a href="/" style={{textDecoration:'underline'}}>عودة للصفحة الرئيسية</a>
      </div>
    </main>
  );
}
