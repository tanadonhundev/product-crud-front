import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { UploadPreview } from "./UploadPreview";
import axios from "axios";

const formSchema = z.object({
  title: z.string().min(1, "ชื่อสินค้าห้ามว่าง"),

  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().refine((val) => !isNaN(val), {
      message: "กรุณากรอกราคาเป็นตัวเลข",
    })
  ),

  image: z.preprocess(
    (val) => (val === undefined || val === null ? [] : val),
    z
      .array(
        z
          .instanceof(File)
          .refine((file) => file.size > 0, "ไฟล์ต้องไม่ว่างเปล่า")
      )
      .min(1, "ภาพสินค้าห้ามว่าง")
      .max(5, "อัปโหลดได้ไม่เกิน 5 รูป")
      .superRefine((files, ctx) => {
        files.forEach((file, i) => {
          if (!file.type.startsWith("image/")) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "อนุญาตเฉพาะไฟล์รูปภาพเท่านั้น",
              path: [i],
            });
          }

          if (file.size > 5 * 1024 * 1024) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "ขนาดไฟล์ต้องไม่เกิน 5MB",
              path: [i],
            });
          }
        });
      })
  ),
});

type formvalutes = z.infer<typeof formSchema>;

type AddProductFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AddProductForm = ({ open, onOpenChange }: AddProductFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onsubmit = async (data: formvalutes) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price.toString());
    for (const item of data.image) {
      formData.append("image", item);
    }
    const res = await axios.post("/api/product", formData, {
      headers: { "Content-Type": "multipart/for,-data" },
    });
    console.log(res.data);
    // setOpen(false);
    reset();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>เพิ่มข้อมูลสินค้า</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                ชื่อสิ้นค้า
              </Label>
              <Input id="title" className="col-span-3" {...register("title")} />
              {errors.title && (
                <p className="text-red-500 col-span-4 ml-28">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                ราคา
              </Label>
              <Input id="price" className="col-span-3" {...register("price")} />
              {errors.price && (
                <p className="text-red-500 col-span-4 ml-28">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <UploadPreview
                onChange={field.onChange}
                value={field.value as File[]}
                error={errors.image?.message}
              />
            )}
          />
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "กำลังบันทึก" : "บันทึก"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductForm;
