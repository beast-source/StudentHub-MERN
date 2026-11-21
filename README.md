
# StudentHub – MERN Stack Student Management System

## Requirements
- Node.js 18+
- MongoDB local installation or MongoDB Atlas connection string

## 1. Backend Setup

```bash
cd server
npm install
```

Create `server/.env` using `.env.example`, then start:

```bash
npm run dev
```

Backend runs at http://localhost:5000

## 2. Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs at http://localhost:5173

## Environment

`server/.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/studenthub
JWT_SECRET=replace_this_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/students | Protected |
| GET | /api/students/:id | Protected |
| POST | /api/students | Protected |
| PUT | /api/students/:id | Protected |
| DELETE | /api/students/:id | Protected |

Student records belong to the authenticated user. A user cannot read, update, or delete another user's records.

## Notes

- Passwords are hashed with bcryptjs before storage.
- JWT is sent as a Bearer token in the Authorization header.
- This educational starter stores the token in localStorage. For production, consider secure HttpOnly cookies, rate limiting, validation, HTTPS, and stronger deployment configuration.
