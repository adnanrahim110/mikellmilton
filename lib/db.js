import mysql from "mysql2/promise";

let pool;
export function getPool() {
  if (pool) return pool;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL missing");
  // mysql2 accepts a connection string directly
  const withLimit = url.includes("?") ? `${url}&connectionLimit=10` : `${url}?connectionLimit=10`;
  pool = mysql.createPool(withLimit);
  return pool;
}
