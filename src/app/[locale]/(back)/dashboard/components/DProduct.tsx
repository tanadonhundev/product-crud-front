"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import AddProductForm from "./product/AddProductForm";

const DProduct = () => {
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    setOpen(true);
  };
  return (
    <div className="p-4">
      <Button onClick={handleAdd}>เพิ่มสินค้า</Button>
      <AddProductForm open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default DProduct;
