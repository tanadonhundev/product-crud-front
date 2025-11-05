"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import AppLogoutButton from "./AppLogoutButton";


interface AppHeaderMobileProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any; // ideally replace `any` with a type like `Session | null`
}

const AppHeaderMobile = ({ session }: AppHeaderMobileProps) => {
  console.log(session);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      {/* Hamburger */}
      <div className="flex lg:hidden">
        <button
          type="button"
          className="text-gray-900"
          onClick={() => setIsDrawerOpen(true)}
        >
          <svg
            className="w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div
          className="absolute inset-0 bg-opacity-30"
          onClick={() => setIsDrawerOpen(false)}
        ></div>

        <div className="relative w-64 h-full bg-white shadow-lg p-6">
          <button
            className="absolute top-4 right-4 text-gray-600"
            onClick={() => setIsDrawerOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <nav className="mt-8 space-y-4">
            <a href="#" className="block text-gray-900 font-medium">
              หน้าแรก
            </a>
            <a href="#" className="block text-gray-900 font-medium">
              คำถามที่พบบ่อย
            </a>
            <a href="#" className="block text-gray-900 font-medium">
              ข่าวประชาสัมพันธ์
            </a>
          </nav>
          {!session && (
            <div className="">
              <Button variant={"outline"} asChild>
                <Link href={"login"}>เข้าสู่ระบบ</Link>
              </Button>
              <Button>
                <Link href={"singup"}>สมัครสมาชิก</Link>
              </Button>
            </div>
          )}
          {session && <AppLogoutButton />}
        </div>
      </div>
    </>
  );
};

export default AppHeaderMobile;
