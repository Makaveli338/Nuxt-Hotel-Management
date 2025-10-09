import { Client } from 'pg';

export default defineNitroPlugin(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    console.log("✅ PostgreSQL connected:", new Date().toISOString());
    await client.end();
  } catch (err) {
    console.error("❌ PostgreSQL connection error:", err);
  }
});
