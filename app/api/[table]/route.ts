import { getAll, create } from "../../../lib/crud";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { table: string } }
) {
  const data = await getAll(params.table);
  return NextResponse.json(data);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { table: string } }
) {
  const body = await request.json();
  const result = await create(params.table, body);
  return NextResponse.json({ message: "Created", result }, { status: 201 });
}
