import { Pool } from 'pg';

export async function connectPostgresDb() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 5432,
  });

  return new Promise((resolve, reject) => {
    pool.connect((err, client) => {
      if (err) {
        reject(err);
      } else {
        resolve(client);
      }
    });
  });
}

export async function executeQuery(req, query, params = []) {
  const db = req.app.get('db');
  return db.query(query, params);
}
