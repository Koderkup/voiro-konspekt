import { getById, update, remove } from "../../../../lib/crud";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { table: string; id: string } }
) {
  const data = await getById(params.table, params.id);
  return NextResponse.json(data);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { table: string; id: string } }
) {
  const body = await request.json();
  const result = await update(params.table, params.id, body);
  return NextResponse.json({ message: "Updated", result });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { table: string; id: string } }
) {
  const result = await remove(params.table, params.id);
  return NextResponse.json({ message: "Deleted", result });
}
