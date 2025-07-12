"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { SidebarTrigger } from "@/components/ui/sidebar";

function AppHeader() {
  return (
    <header className="p-4 flex justify-between items-center border-b bg-white shadow-sm">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <UserButton />
      </div>
    </header>
  );
}

export default AppHeader;
