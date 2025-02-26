"use client";
import { NavHeader } from "../components/nav-header"

import { UserButton } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="flex flex-col h-screen">
      <NavHeader />
      <div className="flex items-center justify-center flex-grow">
        <UserButton />
      </div>
    </div>
  );
} 