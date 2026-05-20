import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import fetch from 'node-fetch';
import { PrismaClient } from '@prisma/client';
import paymentsRouter from './routes/payments.js';
import web3Router from './routes/web3.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

const prisma = new PrismaClient();

app.get('/', (req, res) => res.json({ ok: true, service: 'tohfa-api v3.7' }));

// PDPL basic hooks (placeholders)
app.post('/api/pdpl/export', async (req,res) => {
  res.json({ status:'received', note:'Implement actual export pipeline per PDPL.'});
});
app.post('/api/pdpl/delete', async (req,res) => {
  res.json({ status:'received', note:'Implement actual delete pipeline per PDPL.'});
});

// NFC: hash UID (server-side salt)
app.post('/api/web3/nfc/hash', async (req,res) => {
  const { uid } = req.body;
  const salt = process.env.NFC_SECRET_SALT || 'tohfa_salt';
  const hash = crypto.createHash('sha256').update(uid + salt).digest('hex');
  res.json({ uidHash: hash });
});

app.use('/api/payments', paymentsRouter);
app.use('/api/web3', web3Router);

// Simple products
app.get('/api/products', async (req,res) => {
  const list = await prisma.product.findMany({ take: 50, orderBy: { createdAt: 'desc' } });
  res.json(list);
});

// Semantic search stub (to be backed by pgvector SQL in v3.6)
app.get('/api/search-similar', async (req,res) => {
  const q = (req.query.q || '').toString();
  // In production, call AI embeddings service and run SQL with <=> cosine.
  res.json({ query: q, results: [] });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API on :${port}`));