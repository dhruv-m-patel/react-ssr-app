import mysql from 'mysql';

export async function connectMysqlDb() {
  const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 100,
    typeCast: true,
  });

  return pool;
}

export async function executeQuery(req, query, params = []) {
  const pool = req.app.get('db');
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }

      connection.query(query, params, (error, result) => {
        if (error) {
          reject(error);
        }

        if (
          query.trim().toLowerCase().startsWith('insert') &&
          result.affectedRows === 1
        ) {
          resolve(result.insertId);
        } else {
          resolve(result);
        }
      });
    });
  });
}
