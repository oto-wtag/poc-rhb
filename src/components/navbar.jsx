import React, { useState } from "react";
import { BellIcon, HamburgerMenu } from "@/assets/icons/navbar-icons";
import NavbarCutout from "@/assets/icons/navbar-cutout.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  TermsAndPolicyIcon,
  SecurityIcon,
  NetworkIcon,
  SupportIcon,
  SettingIcon,
  LoginIcon,
} from "@/assets/icons/hamburger-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const menuItems = [
    {
      id: 1,
      displayName: "Terms & Policy",
      icon: TermsAndPolicyIcon,
    },
    {
      id: 2,
      displayName: "Security",
      icon: SecurityIcon,
    },
    {
      id: 3,
      displayName: "Network",
      icon: NetworkIcon,
    },
    {
      id: 4,
      displayName: "Support",
      icon: SupportIcon,
    },
    {
      id: 5,
      displayName: "Settings",
      icon: SettingIcon,
    },
    {
      id: 6,
      displayName: "Login",
      icon: LoginIcon,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-50 flex">
      <div className="absolute top-0 left-0 w-full flex justify-between items-center h-full px-6 md:px-12">
        <img src="/pwa-512x512.png" className="w-28" alt="RhB Logo" />
        <div className="flex space-x-4">
          <BellIcon />
          <Sheet>
            <SheetTrigger asChild>
              <div className="cursor-pointer">
                <HamburgerMenu />
              </div>
            </SheetTrigger>
            <SheetContent
              closeButton="secondary"
              className={cn("!sm:max-w-[400px]")}
            >
              <SheetHeader className={cn("bg-primary")}>
                <SheetTitle className={cn("text-white")}>Menu</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4 mx-4">
                {menuItems.map((menu) => (
                  <div
                    key={menu.id}
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      {menu.icon && <menu.icon className="h-full" />}
                    </div>
                    <span>{menu.displayName}</span>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="bg-[#EB0A23] flex-1" />
      <img src={NavbarCutout} className="" />
    </nav>
  );
};

export default Navbar;
