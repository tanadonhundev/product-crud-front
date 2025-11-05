import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeFromCookie = cookieStore.get("NEXT_LOCALE")?.value; // อ่าน cookie ชื่อ 'locale'

  const locale = localeFromCookie || "th"; // ถ้าไม่มี cookie ก็ fallback เป็น 'th'

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
