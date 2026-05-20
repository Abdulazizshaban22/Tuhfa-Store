import useSWR from 'swr';

const useSummary = () => {
  const fetcher = (url:string)=> fetch(url).then(r=>r.json());
  const { data, error } = useSWR('/api/events/summary', fetcher, { refreshInterval: 5000 });
  return { data, error };
};

export default function Dashboard(){
  const { data } = useSummary();
  return (
    <div className="container">
      <h1>Analytics</h1>
      <div className="grid">
        {(data||[]).map((r:any)=>(
          <div className="card" key={r.kind}>
            <h3>{r.kind}</h3>
            <p style={{fontSize:28, margin:0}}>{r.cnt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
