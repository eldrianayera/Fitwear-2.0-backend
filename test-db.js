require("dotenv").config();
const { Pool } = require("pg");

console.log("🔍 Checking environment variables...");
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "FOUND" : "NOT FOUND");

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL not found in .env file");
  process.exit(1);
}

// Show masked URL
const maskedUrl = process.env.DATABASE_URL.replace(/:([^:@]+)@/, ":***@");
console.log("Connection string:", maskedUrl);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function testConnection() {
  try {
    console.log("🔄 Attempting to connect...");
    const client = await pool.connect();
    console.log("✅ Database connected successfully!");

    const result = await client.query("SELECT NOW() as current_time");
    console.log("📅 Current time:", result.rows[0].current_time);

    client.release();
    await pool.end();
    console.log("✅ Connection test completed");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);

    if (error.message.includes("ENOTFOUND")) {
      console.log("💡 Try checking:");
      console.log("   1. Your Supabase project is active");
      console.log("   2. Use connection pooling URL instead");
      console.log("   3. Verify project ID in Supabase dashboard");
    }
  }
}

testConnection();
