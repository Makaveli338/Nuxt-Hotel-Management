import pool from '../utils/db'

interface NewInventoryItem {
  name: string;
  category: string;
  quantity: number;
  price: number;
  status: string;
  last_restock?: string; // optional
}

interface InventoryItem extends NewInventoryItem {
  id: number;
  created_at: string;
  updated_at: string;
}

export default defineEventHandler(async (event): Promise<InventoryItem> => {
  const body = await readBody<NewInventoryItem>(event);
  const { name, category, quantity, price, status, last_restock } = body;

  // ✅ Automatically set last_restock to today's date if empty or missing
  const restockDate =
    last_restock && last_restock.trim() !== ''
      ? last_restock
      : new Date().toISOString().split('T')[0]; // format YYYY-MM-DD

  const query = `
    INSERT INTO inventory (name, category, quantity, price, status, last_restock)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [name, category, quantity, price, status, restockDate];
  const { rows } = await pool.query<InventoryItem>(query, values);

  return rows[0];
});
