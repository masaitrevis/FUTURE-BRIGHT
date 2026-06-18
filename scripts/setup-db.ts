import { pool, initDb } from "../app/lib/server-db";

async function setup() {
  console.log("Setting up Bright Elite database...");

  await initDb();

  if (pool) {
    console.log("✅ Database ready!");
    await pool.end();
  } else {
    console.log("⚠️ No DATABASE_URL found. Set it in .env.local first.");
    console.log("See .env.example for Alwaysdata setup instructions.");
  }
}

setup().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
