import pool from '../utils/db'

export default defineEventHandler(async (event) => {
  try {
    // Read data sent from frontend
    const body = await readBody(event)
    const { user_id, service_name, price, service_time, service_date } = body

    console.log('[SERVICE API] Received body:', body)

    // Validate required fields
    if (!user_id || !service_name || !price || !service_time) {
      console.error('[SERVICE API] Missing required fields')
      throw createError({
        statusCode: 400,
        statusMessage:
          'Missing required fields: user_id, service_name, price, service_time',
      })
    }

    // Convert price to number
    const numericPrice = parseFloat(price)
    if (isNaN(numericPrice)) {
      throw createError({ statusCode: 400, statusMessage: 'Price must be a number' })
    }

    // 💡 Apply dynamic commission rate
    let commissionRate
    if (numericPrice <= 400) {
      commissionRate = 0.3 // 30%
    } else {
      commissionRate = 0.4 // 40%
    }

    const commission = numericPrice * commissionRate

    // Insert service into database
    const result = await pool.query(
      `INSERT INTO services 
        (user_id, service_name, price, service_time, service_date, commission)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        Number(user_id),
        service_name,
        numericPrice,
        service_time,
        service_date || new Date(), // use provided date or now
        commission,
      ]
    )

    console.log('[SERVICE API] Inserted service:', result.rows[0])

    return {
      message: 'Service added successfully',
      commissionRate: `${commissionRate * 100}%`, // 👈 Optional: send applied rate
      service: result.rows[0],
    }
  } catch (err: any) {
    console.error('[SERVICE API ERROR]', err.message)
    throw createError({ statusCode: 500, statusMessage: err.message })
  }
})
