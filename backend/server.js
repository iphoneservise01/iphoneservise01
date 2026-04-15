require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const { z } = require('zod');

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://ТВОЙ-САЙТ.netlify.app',
    ],
    methods: ['POST', 'GET'],
  })
);

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Слишком много заявок. Попробуйте позже.',
  },
});

app.use('/api/', limiter);

const repairModels = ['iPhone', 'Samsung', 'Xiaomi', 'Honor'];
const purchaseModels = ['iPhone 17 Air', 'iPhone 17', 'iPhone 17 Pro', 'iPhone 17 Pro Max'];

const requestSchema = z.object({
  formType: z.enum(['repair', 'purchase']),
  name: z.string().trim().min(2).max(60),
  phone: z.string().trim().min(6).max(25).regex(/^[\d\s+()-]+$/),
  email: z.string().trim().email().max(100),
  model: z.string().trim().min(1).max(50),
  issue: z.string().trim().max(1000).optional().default(''),
  website: z.string().max(200).optional().default(''),
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Backend работает' });
});

app.post('/api/submit', async (req, res) => {
  try {
    const parsed = requestSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Неверные данные формы',
        errors: parsed.error.flatten(),
      });
    }

    const data = parsed.data;

    if (data.website.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Подозрительная заявка отклонена',
      });
    }

    const allowedModels =
      data.formType === 'repair' ? repairModels : purchaseModels;

    if (!allowedModels.includes(data.model)) {
      return res.status(400).json({
        success: false,
        message: 'Недопустимая модель',
      });
    }

    const requestType =
      data.formType === 'repair' ? 'Заявка на ремонт' : 'Заявка на покупку';

    const mailHtml = `
      <h2>${requestType}</h2>
      <p><strong>Имя:</strong> ${data.name}</p>
      <p><strong>Телефон:</strong> ${data.phone}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Модель:</strong> ${data.model}</p>
      <p><strong>${data.formType === 'repair' ? 'Описание проблемы' : 'Комментарий'}:</strong></p>
      <p>${data.issue || '—'}</p>
    `;

    await transporter.sendMail({
      from: `"Заявки с сайта" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `${requestType} — ${data.model}`,
      html: mailHtml,
    });

    return res.json({
      success: true,
      message: 'Заявка успешно отправлена',
    });
  } catch (error) {
    console.error('Ошибка сервера:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера',
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});