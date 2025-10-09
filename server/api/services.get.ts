import pool from '../utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { userId, role } = query // role: "admin" or "staff"

  try {
    // ✅ 1️⃣ Fetch all services
    let servicesSql = `
      SELECT s.id, s.user_id, s.service_name, s.price, s.service_time, s.service_date, s.commission, u.username
      FROM services s
      JOIN users u ON s.user_id = u.id
      WHERE 1=1
    `
    const params: any[] = []

    // Only filter by user_id for staff
    if (role !== 'admin' && userId) {
      params.push(Number(userId))
      servicesSql += ` AND s.user_id = $${params.length}`
    }

    servicesSql += ` ORDER BY s.service_date DESC`
    const allServices = (await pool.query(servicesSql, params)).rows

    // ✅ 2️⃣ Calculate totals
    const today = new Date()
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - today.getDay()) // Sunday

    let totalTodayEarned = 0
    let totalTodayCommission = 0
    let totalWeekEarned = 0
    let totalWeekCommission = 0

    allServices.forEach((s) => {
      const serviceDate = new Date(s.service_date)

      // Today
      if (serviceDate >= todayStart) {
        totalTodayEarned += parseFloat(s.price)
        totalTodayCommission += parseFloat(s.commission)
      }

      // This week
      if (serviceDate >= weekStart) {
        totalWeekEarned += parseFloat(s.price)
        totalWeekCommission += parseFloat(s.commission)
      }
    })

    // Total services performed
    const totalServices = allServices.length

    // Top staff (by number of services)
    const staffCount: Record<string, number> = {}
    allServices.forEach((s) => {
      staffCount[s.username] = (staffCount[s.username] || 0) + 1
    })

    const topStaff = Object.entries(staffCount).sort((a, b) => b[1] - a[1])[0] || [null, 0]

    return {
      totals: {
        today: { totalEarned: totalTodayEarned, totalCommission: totalTodayCommission },
        week: { totalEarned: totalWeekEarned, totalCommission: totalWeekCommission },
      },
      totalServices,
      topStaff: { name: topStaff[0], services: topStaff[1] },
      services: allServices,
    }
  } catch (err: any) {
    console.error('[SERVICE API ERROR]', err.message)
    throw createError({ statusCode: 500, statusMessage: err.message })
  }
})
