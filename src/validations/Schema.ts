import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().min(1, { message: "ป้อนข้อมูลอีเมลด้วย" }),
  email: z
    .string()
    .min(1, { message: "ป้อนข้อมูลอีเมลด้วย" })
    .email({ message: "รูปแบบอีเมลไม่ถูกต้อง" })
    .trim(),
  password: z.string().min(4, { message: "รหัสผ่านต้องมี 4 ตัวขึ้นไป" }).trim(),
});

export const singupSchema = z.object({
  name: z.string().min(1, { message: "ป้อนข้อมูลอีเมลด้วย" }),
  email: z
    .string()
    .min(1, { message: "ป้อนข้อมูลอีเมลด้วย" })
    .email({ message: "รูปแบบอีเมลไม่ถูกต้อง" })
    .trim(),
  password: z.string().min(4, { message: "รหัสผ่านต้องมี 4 ตัวขึ้นไป" }).trim(),
});
