import { db } from "./db";
import { RowDataPacket } from "mysql2";

type DBRow<T> = T & RowDataPacket;

export async function getAll<T extends RowDataPacket>(
  table: string
): Promise<T[]> {
  const [rows] = await db.query<T[]>(`SELECT * FROM ??`, [table]);
  return rows;
}

export async function getById<T extends RowDataPacket>(
  table: string,
  id: string
): Promise<T | null> {
  const [rows] = await db.query<T[]>(`SELECT * FROM ?? WHERE id = ?`, [
    table,
    id,
  ]);
  return rows[0] || null;
}

export async function create(table: string, data: Record<string, any>) {
  const [result] = await db.query(`INSERT INTO ?? SET ?`, [table, data]);
  return result;
}

export async function update(
  table: string,
  id: string,
  data: Record<string, any>
) {
  const [result] = await db.query(`UPDATE ?? SET ? WHERE id = ?`, [
    table,
    data,
    id,
  ]);
  return result;
}

export async function remove(table: string, id: string) {
  const [result] = await db.query(`DELETE FROM ?? WHERE id = ?`, [table, id]);
  return result;
}
