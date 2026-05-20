import ProductCard from './ProductCard';
export default function ProductGrid({items}:{items:any[]}){
  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">{items.map((p,i)=> <ProductCard key={i} p={p}/>)}</div>
}