export const PORT = process.env.PORT || 3000;
const password= 'ResOvJ5aqtLmNtPl';
export const MONGODB_URI =
  process.env.MONGODB_URI || `mongodb+srv://jazapatazc16:${password}@base-users.nrr6f5m.mongodb.net/?retryWrites=true&w=majority`;
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";