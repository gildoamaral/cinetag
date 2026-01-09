import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/comentario', async (req, res) => {
  try {
    const { titulo } = req.body;

    if (!titulo) {
      return res.status(400).json({ error: 'Título é obrigatório' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Chave de API não configurada no servidor.' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash-lite',
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.9,
      }
    });

    const prompt = `Aja como um crítico de cinema sarcástico, engraçado e curto e grosso. 
Faça um comentário ácido de no máximo 2 frases sobre o filme: "${titulo}". 
Use emojis.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ comentario: text });

  } catch (error) {
    console.error('Erro no servidor Gemini:', error);
    res.status(500).json({ error: 'A IA não conseguiu processar o pedido.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor API rodando em http://localhost:${PORT}`);
});