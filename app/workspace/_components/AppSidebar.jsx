"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Book,
  Compass,
  LayoutDashboard,
  PencilRulerIcon,
  UserCircleIcon,
  WalletCards,
} from "lucide-react";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddNewCourseDialog from "../AddNewCourseDialog";

const SideBarOptions = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    link: "/#",
  },
  {
    title: "My Learning",
    icon: Book,
    link: "/workspace/my-courses",
  },
  {
    title: "Explore Courses",
    icon: Compass,
    link: "/workspace/explore-courses",
  },
  {
    title: "AI Tools",
    icon: PencilRulerIcon,
    link: "/workspace/ai-tools",
  },
  {
    title: "Billing",
    icon: WalletCards,
    link: "/workspace/billing",
  },
  {
    title: "Profile",
    icon: UserCircleIcon,
    link: "/workspace/profile",
  },
];

function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center p-4">
        <Image src="/logo-IRSDL.jpg" alt="Logo" width={130} height={120} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <AddNewCourseDialog>
            <Button>Create new Course</Button>
          </AddNewCourseDialog>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SideBarOptions.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={`p-5 hover:bg-gray-300 rounded-md`}
                  >
                    <Link
                      href={item.link}
                      className={`text-[17px] 
                        ${
                          path.includes(item.link) && "text-primary bg-blue-50"
                        }`}
                    >
                      <item.icon className="h-7 w-7" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
