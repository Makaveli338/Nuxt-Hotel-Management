import pool from "../../utils/db"

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { userId, newRole } = body

    if (!userId || !newRole) {
      throw createError({
        statusCode: 400,
        statusMessage: "Missing userId or newRole",
      })
    }

    // ✅ Validate role
    const validRoles = ["admin", "staff", "user"]
    if (!validRoles.includes(newRole)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid role provided",
      })
    }

    // ✅ Update the user's role
    const sql = `
      UPDATE users
      SET role = $1
      WHERE id = $2
      RETURNING id, username, email, role
    `
    const result = await pool.query(sql, [newRole, userId])

    if (result.rowCount === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      })
    }

    return {
      success: true,
      message: "User role updated successfully",
      user: result.rows[0],
    }
  } catch (err: any) {
    console.error("[UPDATE ROLE ERROR]", err.message)
    throw createError({
      statusCode: 500,
      statusMessage: err.message || "Failed to update user role",
    })
  }
})
