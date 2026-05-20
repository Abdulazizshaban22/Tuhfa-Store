import SimilarGrid from '../../components/SimilarGrid';

interface Props { params: { id: string } }
export default async function ProductPage({ params }: Props) {
  const p = await fetch(process.env.NEXT_PUBLIC_API_BASE + '/products/' + params.id).then(r => r.json()).catch(() => null);
  if (!p) return <div>لم يتم العثور على المنتج</div>;
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{p.name}</h1>
      <p className="opacity-80 mb-6">{p.description}</p>
      <form action="/checkout">
        <input type="hidden" name="id" value={p.id} />
        <button className="px-4 py-2 bg-black text-white rounded">أضِف إلى السلّة</button>
      </form>
      <SimilarGrid id={p.id} />
    </main>
  );
}
