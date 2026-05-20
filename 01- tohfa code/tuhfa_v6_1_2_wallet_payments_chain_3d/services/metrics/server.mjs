
import Fastify from 'fastify';
import pkg from 'pg'; const { Pool } = pkg;
const app = Fastify();
const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@db:5432/tuhfa' });
app.get('/metrics/overview', async (req, res)=>{
  const { rows: sales } = await pool.query('SELECT COUNT(*)::int AS count, COALESCE(SUM(price_numeric),0)::float AS revenue FROM sales');
  const { rows: assets } = await pool.query('SELECT COUNT(*)::int AS count FROM assets');
  return { sales: sales[0], assets: assets[0], t: Date.now() };
});
const port = process.env.PORT || 7080;
app.listen({ port, host: '0.0.0.0' }).then(()=>console.log('Metrics on :'+port));
