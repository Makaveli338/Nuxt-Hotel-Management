import pool from '../../utils/db'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Missing email or password' })
  }

  try {
    // Check if user exists
    const result = await pool.query(
      `SELECT id, username, email, password, role FROM users WHERE email = $1`,
      [email]
    )

    if (result.rows.length === 0) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
    }

    const user = result.rows[0]

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
    }

    // Return only safe fields
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      message: 'Login successful'
    }
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message })
  }
})
