import express from 'express';
import { PrismaClient } from '@prisma/client';
import validUrl from 'valid-url';
import { hashPassword, comparePassword, generateToken, verifyToken } from '../services/auth';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import geoip from 'geoip-lite';
import twilio from 'twilio';
import nodemailer from 'nodemailer';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendSms(phone: string, message: string) {
  try {
    await twilioClient.messages.create({
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: message,
    });
  } catch (err) {
    console.error('Erro ao enviar SMS:', err);
    throw new Error('Erro ao enviar SMS');
  }
}

// ✅ Criação dinâmica do transporte de e-mail
function createTransporter() {
  const emailService = process.env.EMAIL_SERVICE || 'gmail';

  switch (emailService) {
    case 'gmail':
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

    case 'hotmail':
    case 'outlook':
      return nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

    case 'custom':
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

    default:
      throw new Error(`Serviço de e-mail inválido: ${emailService}`);
  }
}

// Instancia o transporter global
const transporter = createTransporter();

const router = express.Router();
const prisma = new PrismaClient();

// ==========================
// === ROTAS EXISTENTES ====
// ==========================

// Registro
router.post('/api/register', async (req: any, res: any) => {
  const { name, email, password, phone, age } = req.body;

  if (!name || !email || !password || !phone || !age) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Usuário já existe com este email!' });

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, phone, age: Number(age) },
    });

    const token = generateToken({ id: user.id, email: user.email });
    res.status(201).json({ token });
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);
    res.status(500).json({ error: 'Erro interno ao registrar usuário.' });
  }
});

// Recuperação de senha via e-mail
router.post('/api/recover-password', async (req: any, res: any) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'E-mail é obrigatório' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado com esse e-mail' });

    const resetToken = generateToken({ id: user.id, email: user.email });
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: `"Suporte" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Recuperação de Senha',
      html: `
        <p>Olá, ${user.name}!</p>
        <p>Clique no link abaixo para redefinir sua senha:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Se você não solicitou isso, ignore este e-mail.</p>
      `,
    });

    res.json({ message: 'Link de recuperação enviado para o e-mail' });
  } catch (err) {
    console.error('Erro ao enviar e-mail de recuperação:', err);
    res.status(500).json({ error: 'Erro ao enviar link de recuperação por e-mail' });
  }
});

// Documentação da API
router.get('/api/docs', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Documentação da API</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4; }
          h1 { color: #333; }
          pre { background: #fff; padding: 15px; border: 1px solid #ccc; overflow-x: auto; }
          code { color: #c7254e; background-color: #f9f2f4; padding: 2px 4px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>📘 Documentação da API</h1>

        <h2>🔐 Registro de Usuário</h2>
        <pre>
        POST /api/register
        Body:
        {
          "name": "João",
          "email": "joao@email.com",
          "password": "senha123",
          "phone": "+5511999999999",
          "access" : "Admin",
          "age": 30
        }
        </pre>

        <h2>🔑 Recuperação de Senha</h2>
        <pre>
        POST /api/recover-password
        Body:
        {
          "email": "joao@email.com"
        }
        </pre>

        <!-- Aqui você pode continuar adicionando outras rotas -->
        <h2>📍 Outras Rotas (Exemplo)</h2>
        <ul>
          <li><code>POST /api/login</code></li>
          <li><code>GET /api/me</code> (Requer Token)</li>
          <li><code>POST /api/urls</code> - Encurtar URL</li>
        </ul>

        <p>🛡️ Endpoints protegidos exigem o envio do token JWT no header:</p>
        <pre>
Authorization: Bearer &lt;token&gt;
        </pre>
      </body>
    </html>
  `);
});

// (Demais rotas continuam iguais...)
// Aqui você mantém todas as suas outras rotas (login, /api/me, /api/urls, etc.)

export { router };
