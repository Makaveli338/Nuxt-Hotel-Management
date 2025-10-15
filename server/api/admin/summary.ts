import pool from '../../utils/db'

export default defineEventHandler(async (event) => {
  try {
    // 1️⃣ Total revenue and commission per staff
    const staffSummary = await pool.query(`
      SELECT 
        u.username AS name,
        SUM(s.price) AS revenue,
        SUM(s.commission) AS commission
      FROM services s
      JOIN users u ON s.user_id = u.id
      GROUP BY u.username
      ORDER BY revenue DESC;
    `)

    // 2️⃣ Revenue & commission per month
    const revenueByMonth = await pool.query(`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', s.service_date), 'Mon') AS month,
        EXTRACT(MONTH FROM s.service_date) AS month_number,
        SUM(s.price) AS revenue,
        SUM(s.commission) AS commission
      FROM services s
      GROUP BY month, month_number
      ORDER BY month_number;
    `)

    // 3️⃣ Revenue per week
    const revenueByWeek = await pool.query(`
      SELECT 
        DATE_PART('week', s.service_date) AS week,
        SUM(s.price) AS revenue
      FROM services s
      GROUP BY week
      ORDER BY week;
    `)

    // 4️⃣ Return combined results
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
