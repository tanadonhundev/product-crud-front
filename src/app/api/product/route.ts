import conn from "@/db";
import { product, productImage } from "@/db/schema";
import { handleFileUpload } from "@/services/upload-service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { files, formData } = await handleFileUpload(req);

    const title = formData.get("title") as string;
    const price = formData.get("price") as string;

    const db = await conn;
    const result = await db
      .insert(product)
      .values([{ title, price }])
      .$returningId();

    for (const file of files) {
      await db.insert(productImage).values({
        productId: result[0].id,
        imageName: file,
      });
    }
    return NextResponse.json({
      message: "อัพโหลดสำเร็จ",
      files,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
