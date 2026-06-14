import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ||
    "postgresql://future_bright_db_user:TPMf8nxaxYjoE672gFgdephJTHHok5so@dpg-d8mq3bsm0tmc73ddilg0-a.oregon-postgres.render.com/future_bright_db",
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

export async function initDb() {
  await query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10,2),
      category VARCHAR(100),
      image_url TEXT,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export default pool;
