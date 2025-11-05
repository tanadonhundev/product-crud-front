import { getProductService } from "@/services/product-service";
import AppProductDisplay from "@/components/app/AppProductDisplay";

export default async function ProductPage() {
  const products = await getProductService();
  return (
    <div className="mx-auto max-w-4xl pt-16 pb-10">
      <AppProductDisplay products={products} />
    </div>
  );
}
