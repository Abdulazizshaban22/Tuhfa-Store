export default function SimilarSkeleton() {
  return (
    <div className="mt-6 animate-pulse">
      <div className="h-5 w-40 bg-gray-200 rounded mb-3" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({length:6}).map((_,i)=>(
          <div key={i} className="border rounded p-4">
            <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-48 bg-gray-200 rounded mb-1" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
