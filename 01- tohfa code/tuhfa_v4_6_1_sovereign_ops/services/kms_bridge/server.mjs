
import express from 'express';
import { KMSClient, EncryptCommand, DecryptCommand } from '@aws-sdk/client-kms';

const app = express();
app.use(express.json());

const region = process.env.KMS_REGION || 'me-central-1';
const keyId = process.env.KMS_KEY_ID;
const kms = new KMSClient({ region });

app.post('/encrypt', async (req, res) => {
  try{
    const plaintext = Buffer.from(String(req.body.plaintext) || '', 'utf-8');
    const out = await kms.send(new EncryptCommand({ KeyId: keyId, Plaintext: plaintext }));
    res.json({ ciphertext: out.CiphertextBlob?.toString('base64') });
  }catch(e){ res.status(500).json({error:String(e)}); }
});

app.post('/decrypt', async (req, res) => {
  try{
    const blob = Buffer.from(String(req.body.ciphertext || ''), 'base64');
    const out = await kms.send(new DecryptCommand({ CiphertextBlob: blob }));
    res.json({ plaintext: Buffer.from(out.Plaintext || '').toString('utf-8') });
  }catch(e){ res.status(500).json({error:String(e)}); }
});

app.listen(8090, ()=> console.log('KMS bridge on :8090'));
