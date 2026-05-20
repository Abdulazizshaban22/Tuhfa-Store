
import Fastify from 'fastify';
import cors from 'fastify-cors';
import { WebSocketServer } from 'ws';

const app = Fastify();
app.register(cors, { origin: '*' });

app.get('/health', async ()=>({ ok:true }));

const port = process.env.PORT || 7070;
app.listen({ port, host: '0.0.0.0' }).then(()=>{
  console.log('Realtime API on :'+port);
});

// WS broadcast (demo)
const wss = new WebSocketServer({ port: 7071 });
wss.on('connection', ws => {
  ws.send(JSON.stringify({ type:'welcome', t: Date.now() }));
});
