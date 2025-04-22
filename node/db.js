import pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';

// Carrega variáveis do .env
dotenv.config();

// Conexão única com o banco (sem declarações duplicadas)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT), // Converta para número
});

export default pool;