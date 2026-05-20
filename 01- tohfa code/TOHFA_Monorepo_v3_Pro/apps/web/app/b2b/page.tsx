export default function B2B(){
  return (<div>
    <h1>بوابة B2B — الفنادق والمتاحف</h1>
    <p>اطلب تسعيرًا بالجملة وباقات الضيافة. سجّل بيانات منشأتك وسيتم التواصل خلال 24 ساعة.</p>
    <form method="post" action="https://forms.example.com/b2b" style={{display:'grid',gap:8,maxWidth:560}}>
      <input name="company" placeholder="اسم المنشأة"/>
      <input name="cr" placeholder="رقم السجل التجاري"/>
      <input name="email" placeholder="البريد"/>
      <textarea name="needs" placeholder="وصف الطلب (كميات/أنواع)"></textarea>
      <button>إرسال</button>
    </form>
  </div>)
}
