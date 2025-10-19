# URL Curt - Encurtador de Links Fullstack

## Descrição

**URL Curt** é uma aplicação Fullstack desenvolvida com **Node.js**, **Next.js** e **TypeScript**, que permite aos usuários encurtar URLs de forma simples e eficiente. O projeto oferece uma interface intuitiva para criar links curtos personalizados e redirecionamentos rápidos.

## Tecnologias Utilizadas

**Frontend:**

* Next.js
* React
* TypeScript
* Tailwind CSS

**Backend:**

* Node.js
* Express
* TypeScript
* dotenv

**Banco de Dados:**

* MongoDB (via Mongoose)

## Estrutura do Projeto

```
urlcurt/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── urlController.ts
│   │   ├── models/
│   │   │   └── Url.ts
│   │   ├── routes/
│   │   │   └── urlRoutes.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── components/
    │   └── UrlForm.tsx
    ├── pages/
    │   └── index.tsx
    ├── public/
    │   └── favicon.ico
    ├── styles/
    │   └── globals.css
    ├── package.json
    └── tsconfig.json
```

## Como Rodar o Projeto

### Backend

1. Navegue até o diretório do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` com as variáveis:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

4. Inicie o servidor:

```bash
npm run dev
```

O backend estará rodando em `http://localhost:5000`.

### Frontend

1. Navegue até o diretório do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:3000`.

## Endpoints da API

### POST /api/shorten

Cria um link curto.

**Request Body:**

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

### GET /:shortenedId

Redireciona para a URL original.

**Parâmetros:**

* `shortenedId`: ID do link curto.

**Response:**
Redireciona para a URL original.

## Testes

Para rodar os testes:

```bash
npm run test
```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Autor

**Laudier**
[GitHub]([https://github.com/josesantanadeveloper-s](https://github.com/josesantanadeveloper-s)
