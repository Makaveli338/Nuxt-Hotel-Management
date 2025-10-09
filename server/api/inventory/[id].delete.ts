import pool  from "../../utils/db";

export default defineEventHandler(async (event): Promise<{ success: boolean }> => {
  const idParam = event.context.params?.id;
  const id = Number(idParam);

  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid ID parameter" });
  }

  const result = await pool.query("DELETE FROM inventory WHERE id = $1", [id]);

  // Explicitly check for result.rowCount being truthy
  const success = !!result.rowCount && result.rowCount > 0;

  return { success };
});
