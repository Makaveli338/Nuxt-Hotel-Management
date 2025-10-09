import pool from '../utils/db'

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  status: string;
  last_restock: string;
  created_at: string;
  updated_at: string;
}

export default defineEventHandler(async (event): Promise<InventoryItem[]> => {
  const query = getQuery(event);
  const { category } = query as { category?: string };

  let sql = "SELECT * FROM inventory";
  const params: any[] = [];

  if (category) {
    sql += " WHERE category = $1";
    params.push(category);
  }

  sql += " ORDER BY id ASC";
  const { rows } = await pool.query<InventoryItem>(sql, params);
  return rows;
});
