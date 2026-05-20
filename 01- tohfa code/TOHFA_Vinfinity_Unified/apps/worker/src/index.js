import 'dotenv/config';
import { Queue, Worker } from 'bullmq';
const connection = { host: process.env.REDIS_HOST||'redis', port: +(process.env.REDIS_PORT||6379) };

const q = new Queue('tohfa', { connection });
new Worker('tohfa', async job => {
  console.log('Processing job', job.name, job.id);
  return { ok:true };
}, { connection });

console.log('Worker up.');
