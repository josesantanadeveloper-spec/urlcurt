# 🚀 URL Curt - Encurtador de Links Fullstack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge\&logo=next.js\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Descrição

**URL Curt** é uma aplicação **Fullstack** futurista desenvolvida com **Node.js**, **Next.js** e **TypeScript**, projetada para encurtar URLs de forma **rápida, segura e eficiente**. Crie links curtos personalizados e compartilhe de forma inteligente.

---

## 🛠️ Tecnologias

| Frontend     | Backend    | Banco de Dados |
| ------------ | ---------- | -------------- |
| Next.js      | Node.js    | MongoDB        |
| React        | Express    | Mongoose       |
| TypeScript   | TypeScript |                |
| Tailwind CSS | dotenv     |                |

---

## 📁 Estrutura do Projeto

```
urlcurt/
├── backend/
│   ├── src/
│   │   ├── controllers/  🛠️
│   │   ├── models/       🗃️
│   │   ├── routes/       🌐
│   │   └── server.ts     ⚡
│   ├── .env
│   └── tsconfig.json
└── frontend/
    ├── components/       🧩
    ├── pages/            🖥️
    ├── public/           🖼️
    ├── styles/           🎨
    └── tsconfig.json
```

---

## ⚡ Como Rodar

### Backend

```bash
cd backend
npm install
# Configure .env
npm run dev
```

🔹 Backend: `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

🔹 Frontend: `http://localhost:3000`

---

## 🌐 Endpoints da API

### `POST /api/shorten` ✏️

Cria um link curto.

**Request:**

```json
{
  "url": "https://www.exemplo.com"
}
```

**Response:**

```json
{
  "shortenedUrl": "http://localhost:5000/abc123"
}
```

### `GET /:shortenedId` 🔗

Redireciona para a URL original.

---

## 🧪 Testes

```bash
npm run test
```

---

## 📌 Licença

MIT License

---

## 👨‍💻 Autor

**Laudier**
[GitHub](https://github.com/josesantanadeveloper-spec) • [LinkedIn](https://linkedin.com/in/seuusuario)

---

## 🌌 Visual Futurista

Este projeto combina tecnologia moderna e design clean para um **controle total sobre links**, pronto para **escala e performance**.
