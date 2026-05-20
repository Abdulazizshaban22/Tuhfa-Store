import cron from 'node-cron';
import axios from 'axios';
console.log('Worker started');
cron.schedule('*/20 * * * * *', async () => {
  try { const res = await axios.get(process.env.AI_HEALTH || 'http://ai:8001/health'); if(res.data?.ok) console.log('AI ok'); }
  catch(e){ console.error('AI health failed'); }
});
