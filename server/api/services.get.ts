import pool from '../utils/db'
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  addHours,
  isWithinInterval,
} from 'date-fns'

// ✅ Define types for your service row and response
interface ServiceRow {
  id: number
  user_id: number
  service_name: string
  price: string // stored as string in DB
  service_time: string
  service_date: string | Date
  commission: string
  username: string
}

interface Totals {
  totalEarned: number
  totalCommission: number
}

interface ApiResponse {
  totals: {
    today: Totals
    week?: Totals
  }
  totalServices: number
  topStaff: { name: string | null; services: number }
  services: ServiceRow[]
}

export default defineEventHandler(async (event): Promise<ApiResponse> => {
  const query = getQuery(event)
  const { userId, role, date } = query as {
    userId?: string
    role?: string
    date?: string
  }

  try {
    // ✅ 1️⃣ Fetch all services
    let servicesSql = `
      SELECT s.id, s.user_id, s.service_name, s.price, s.service_time, s.service_date, s.commission, u.username
      FROM services s
      JOIN users u ON s.user_id = u.id
      WHERE 1=1
    `
    const params: (string | number)[] = []

    // Only filter by user_id for staff
    if (role !== 'admin' && userId) {
      params.push(Number(userId))
      servicesSql += ` AND s.user_id = $${params.length}`
    }

    servicesSql += ` ORDER BY s.service_date DESC`

    const allServices = (await pool.query<ServiceRow>(servicesSql, params)).rows
    console.log('🧩 Total services fetched:', allServices.length)

    // ✅ 2️⃣ Time setup — use Kenya time (UTC+3)
    const now = date ? new Date(date + 'T00:00:00Z') : new Date()
    const localNow = addHours(now, 3) // adjust to EAT
    const todayStart = startOfDay(localNow)
    const todayEnd = endOfDay(localNow)
    const weekStart = startOfWeek(localNow, { weekStartsOn: 1 }) // Monday
    const weekEnd = endOfWeek(localNow, { weekStartsOn: 1 })

    console.log('🕒 Date param:', date || '(today)')
    console.log('📆 Today range:', todayStart.toISOString(), todayEnd.toISOString())

    // ✅ 3️⃣ Totals initialization
    let totalTodayEarned = 0
    let totalTodayCommission = 0
    let totalWeekEarned = 0
    let totalWeekCommission = 0

    const filteredServices: ServiceRow[] = []

    // ✅ 4️⃣ Compute totals
    for (const s of allServices) {
      const serviceDate = new Date(s.service_date)
      const price = parseFloat(s.price) || 0
      const commission = parseFloat(s.commission) || 0

      // Specific date mode
      if (date) {
        if (isWithinInterval(serviceDate, { start: todayStart, end: todayEnd })) {
          filteredServices.push(s)
          totalTodayEarned += price
          totalTodayCommission += commission
        }
      } else {
        // Dashboard (today + week)
        if (isWithinInterval(serviceDate, { start: todayStart, end: todayEnd })) {
          totalTodayEarned += price
          totalTodayCommission += commission
        }
        if (isWithinInterval(serviceDate, { start: weekStart, end: weekEnd })) {
          totalWeekEarned += price
          totalWeekCommission += commission
        }
      }
    }

    // ✅ 5️⃣ Aggregate other info
    const totalServices = allServices.length

    const staffCount: Record<string, number> = {}
    for (const s of allServices) {
      staffCount[s.username] = (staffCount[s.username] || 0) + 1
    }

    const topStaffEntry = Object.entries(staffCount).sort((a, b) => b[1] - a[1])[0]
    const topStaff = topStaffEntry
      ? { name: topStaffEntry[0], services: topStaffEntry[1] }
      : { name: null, services: 0 }

    // ✅ 6️⃣ Return response
    return {
      totals: date
        ? { today: { totalEarned: totalTodayEarned, totalCommission: totalTodayCommission } }
        : {
            today: { totalEarned: totalTodayEarned, totalCommission: totalTodayCommission },
            week: { totalEarned: totalWeekEarned, totalCommission: totalWeekCommission },
          },
      totalServices,
      topStaff,
      services: date ? filteredServices : allServices,
    }
  } catch (err: any) {
    console.error('[SERVICE API ERROR]', err.message)
    throw createError({ statusCode: 500, statusMessage: err.message })
  }
})
