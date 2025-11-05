import "server-only";
import conn from "@/db";
import { desc, eq } from "drizzle-orm";
import { product } from "@/db/schema";

const db = await conn;

export async function getProductService() {
  // select * from product
  return await db.query.product.findMany({
    orderBy: desc(product.id),
    with: {
      productImages: true,
    },
  });
}

export async function getProductByIdService(id: number) {
  return await db.query.product.findMany({
    where: eq(product.id, id),
    with: {
      productImages: true,
    },
  });
}
