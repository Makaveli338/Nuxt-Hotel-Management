import pool from "../../utils/db";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, email, password, role } = body;

    if (!username || !email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing required fields",
      });
    }

    // ✅ Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert into the users table
    const sql = `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, role
    `;

    const result = await pool.query(sql, [
      username,
      email,
      hashedPassword,
      role || "staff",
    ]);

    const user = result.rows[0];

    return { success: true, user };
  } catch (err: any) {
    console.error("[REGISTER ERROR]", err.message);
    throw createError({
      statusCode: 500,
      statusMessage: err.message || "Failed to register user",
    });
  }
});
