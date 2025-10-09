import pool from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    // 1️⃣ Query total revenue and commission per staff
    const staffSummary = await pool.query(`
      SELECT 
        u.username AS name,
        SUM(s.price) AS revenue,
        SUM(s.commission) AS commission
      FROM services s
      JOIN users u ON s.user_id = u.id
      GROUP BY u.username
      ORDER BY revenue DESC
    `)

    // 2️⃣ Query revenue per month
    const revenueByMonth = await pool.query(`
      SELECT 
        TO_CHAR(s.service_date, 'Mon') AS month,
        SUM(s.price) AS revenue
      FROM services s
      GROUP BY month
      ORDER BY MIN(s.service_date)
    `)

    // 3️⃣ Query revenue per week
    const revenueByWeek = await pool.query(`
      SELECT 
        DATE_PART('week', s.service_date) AS week,
        SUM(s.price) AS revenue
      FROM services s
      GROUP BY week
      ORDER BY week
    `)

    return {
      staffSummary: staffSummary.rows,
      statsByMonth: revenueByMonth.rows,
      statsByWeek: revenueByWeek.rows,
    }
  } catch (err: any) {
    console.error('[ADMIN SUMMARY API ERROR]', err.message)
    throw createError({ statusCode: 500, statusMessage: err.message })
  }
})
