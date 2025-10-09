import pool from '../utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { userId } = query

  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: "Missing userId" })
  }

  try {
    const result = await pool.query(
      `SELECT service_date
       FROM services
       WHERE user_id = $1`,
      [Number(userId)]
    )

    // Return only ISO dates (yyyy-mm-dd)
    const workedDates = result.rows.map(r => r.service_date.toISOString().slice(0, 10))
    return workedDates
  } catch (err: any) {
    console.error(err)
    throw createError({ statusCode: 500, statusMessage: "Failed to fetch dates" })
  }
})
