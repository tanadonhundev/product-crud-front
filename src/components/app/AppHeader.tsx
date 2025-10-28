import { Suspense } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
// import AppLogoutButton from "./AppLogoutButton";
// import AppHeaderMobile from "./AppHeaderMobile";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

const AppHeader = async () => {
  //   const session = await auth.api.getSession({
  //     headers: await headers(),
  //   });

  return (
    <div className="overflow-x-hidden bg-gray-50">
      <header className="relative py-4 md:py-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="shrink-0">
              <a href="#" className="flex font-bold text-3xl">
                Product CRUD
              </a>
            </div>
            {/* {session && <div>ยินดีต้อนรับ {session.user.email}</div>} */}
            {/* Client drawer */}
            <Suspense fallback={null}>
              {/* <AppHeaderMobile session={session} /> */}
            </Suspense>
            {/* Desktop navigation */}
            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-12">
              <a href="#" className="text-base font-medium text-gray-900">
                หน้าแรก
              </a>
              <a href="#" className="text-base font-medium text-gray-900">
                คำถามที่พบบ่อย
              </a>
              <a href="#" className="text-base font-medium text-gray-900">
                ข่าวประชาสัมพันธ์
              </a>
            </div>
            {/* Desktop login/signup */}
            <div className="hidden lg:flex lg:items-center lg:space-x-3">
              {/* {!session && ( */}
              <>
                <Button variant={"outline"} asChild>
                  <Link href={"login"}>เข้าสู่ระบบ</Link>
                </Button>
                <Button>
                  <Link href={"singup"}>สมัครสมาชิก</Link>
                </Button>
              </>
              {/* // )} */}
              {/* {session && <AppLogoutButton />} */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AppHeader;
