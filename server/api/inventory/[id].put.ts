import pool  from "../../utils/db";

interface UpdateInventoryItem {
  name: string;
  category: string;
  quantity: number;
  price: number;
  status: string;
  last_restock: string;
}

interface InventoryItem extends UpdateInventoryItem {
  id: number;
  created_at: string;
  updated_at: string;
}

export default defineEventHandler(async (event): Promise<InventoryItem | null> => {
  const id = Number(event.context.params?.id);
  const body = await readBody<UpdateInventoryItem>(event);
  const { name, category, quantity, price, status, last_restock } = body;

  const { rows } = await pool.query<InventoryItem>(
    `UPDATE inventory
     SET name=$1, category=$2, quantity=$3, price=$4, status=$5, last_restock=$6, updated_at=NOW()
     WHERE id=$7
     RETURNING *`,
    [name, category, quantity, price, status, last_restock, id]
  );

  return rows.length > 0 ? rows[0] : null;
});
