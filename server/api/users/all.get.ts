import pool from "../../utils/db"

export default defineEventHandler(async (event) => {
  try {
    const sql = `SELECT id, username, email, role FROM users ORDER BY id ASC`
    const result = await pool.query(sql)

    return { success: true, users: result.rows }
  } catch (err: any) {
    console.error("[GET USERS ERROR]", err.message)
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch users",
    })
  }
})
