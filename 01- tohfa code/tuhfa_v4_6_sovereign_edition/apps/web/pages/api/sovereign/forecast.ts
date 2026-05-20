
import type { NextApiRequest, NextApiResponse } from 'next';

/** بسيط: يحاول نمذجة خطية، وإن تعذر يعيد متوسط متحرك */
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  try{
    const { model='prophet', csv='' } = req.body||{};
    const rows = String(csv).trim().split(/\n+/).map((r:string)=>{
      const [ds, y] = r.split(','); return { ds: new Date(ds), y: Number(y) };
    }).filter(x=>!isNaN(x.y));
    if(rows.length<2) return res.status(400).json({error:'need >=2 rows'});
    rows.sort((a,b)=>a.ds.getTime()-b.ds.getTime());
    // naive linear regression
    const xs = rows.map((r,i)=>i);
    const ys = rows.map(r=>r.y);
    const n = xs.length;
    const mean = (arr:number[])=>arr.reduce((a,b)=>a+b,0)/arr.length;
    const mx = mean(xs), my = mean(ys);
    const num = xs.reduce((s,xi,i)=> s + (xi-mx)*(ys[i]-my), 0);
    const den = xs.reduce((s,xi)=> s + (xi-mx)*(xi-mx), 0) || 1;
    const slope = num/den, intercept = my - slope*mx;
    const horizon = 7;
    const lastIndex = n-1;
    const forecast = Array.from({length:horizon}, (_,k)=>{
      const i = lastIndex + (k+1);
      const yhat = intercept + slope*i;
      const date = new Date(rows[lastIndex].ds.getTime() + (k+1)*24*3600*1000);
      return { ds: date.toISOString().slice(0,10), yhat: Math.round(yhat*100)/100 };
    });
    res.status(200).json({ model, forecast });
  }catch(e:any){
    res.status(500).json({error:e?.message||'error'});
  }
}
