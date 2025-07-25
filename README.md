# Digital Matrimony Portal

A full-stack web application for online marriage registration and management, built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User registration & login (JWT authentication)
- Submit marriage application (spouse details, witnesses, documents)
- View application status
- Download digital marriage certificate (PDF, AI-generated message)
- Officer dashboard: review, approve/reject, schedule, generate certificates
- Admin dashboard: manage users/officers, promote roles, view all applications
- File uploads (documents)
- Responsive, modern UI with Tailwind CSS

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT + bcrypt
- **File Uploads:** Multer
- **PDF Generation:** pdf-lib
- **AI Integration:** OpenAI (for certificate messages)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- MongoDB Atlas account
- OpenAI API key (for AI-powered certificates)

### 1. Clone the Repository

```sh
# Clone the repo
https://github.com/your-username/marriage-system.git
cd marriage-system
```

### 2. Setup the Server

```sh
cd server
pnpm install
# Create a .env file in server/ with:
# MONGO_URI=your_mongodb_atlas_uri
# PORT=5000
# JWT_SECRET=your_jwt_secret
# OPENAI_API_KEY=your_openai_api_key
pnpm run dev
```

### 3. Setup the Client

```sh
cd ../client
pnpm install
# Create a .env file in client/ with:
# VITE_API_URL=http://localhost:5000
pnpm run dev
```

### 4. Usage

- Visit `http://localhost:5173` in your browser.
- Register as a user, officer, or admin (promote roles via admin dashboard).
- Submit and manage marriage applications.

## Environment Variables

**Server (.env):**

```
MONGO_URI=your_mongodb_atlas_uri
PORT=5000
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

**Client (client/.env):**

```
VITE_API_URL=http://localhost:5000
```

## Folder Structure

```
Marriage system/
  client/      # React frontend
  server/      # Node/Express backend
  .gitignore
  README.md
```

## License

MIT
