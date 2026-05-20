type P={p:{imageUrl:string,title:string,description?:string,priceSar:number,externalId:string}};
export default function ProductCard({p}:P){
  return <a href={`/product/${p.externalId}`} className="block bg-white rounded-xl shadow-card overflow-hidden">
    <img src={p.imageUrl} alt="" className="w-full h-56 object-cover"/>
    <div className="p-4">
      <div className="font-bold">{p.title}</div>
      <div className="text-sm text-gray-600 line-clamp-2">{p.description}</div>
      <div className="mt-2 text-royal font-semibold">{Number(p.priceSar).toFixed(2)} SAR</div>
    </div>
  </a>
}