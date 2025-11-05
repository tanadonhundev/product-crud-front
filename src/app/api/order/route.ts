import conn from "@/db";
import { order } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

type NewOrder = typeof order.$inferInsert;

export async function POST(req: NextRequest) {
  const body = (await req.json()) as NewOrder[];
  console.log(body)
  const db = await conn;

  await db.insert(order).values(body);

  return NextResponse.json({ message: "บันทึกคำสั่งซื้อสำเร็จ",}, {status: 201,});
}
