"use client";

import React from "react";
import { SignOutButton, SignedIn, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { sidebarLinks } from "@/constants/index";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
 const { userId } = useAuth();
 
  return (
    <div className="custom-scrollbar leftsidebar">
      <div className="w-full flex flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route;

          if(link.route === '/profile') link.route = `${link.route}/${userId}`
          return (
            <Link
              href={link.route}
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
              key={link.route}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src={"/assets/logout.svg"}
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
};

export default LeftSidebar;
