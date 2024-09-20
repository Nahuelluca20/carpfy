"use client";
import { CreditCard, Menu, Settings, Users, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { SheetTrigger, SheetContent, Sheet } from "./ui/sheet";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("mycard");

  const NavItems = ({ onClick }: { onClick?: () => void }) => (
    <>
      <Button
        variant={activeSection === "mycard" ? "default" : "ghost"}
        onClick={() => {
          setActiveSection("mycard");
          onClick?.();
        }}
        className="w-full justify-start"
      >
        <CreditCard className="mr-2 h-4 w-4" />
        My Card
      </Button>
      <Button
        variant={activeSection === "myteam" ? "default" : "ghost"}
        onClick={() => {
          setActiveSection("myteam");
          onClick?.();
        }}
        className="w-full justify-start"
      >
        <Users className="mr-2 h-4 w-4" />
        My Team
      </Button>
      <Button
        variant={activeSection === "config" ? "default" : "ghost"}
        onClick={() => {
          setActiveSection("config");
          onClick?.();
        }}
        className="w-full justify-start"
      >
        <Settings className="mr-2 h-4 w-4" />
        Config
      </Button>
    </>
  );

  return (
    <nav className="border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <span className="text-2xl font-semibold">CarImprovePro</span>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavItems />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Menu</span>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetTrigger>
              </div>
              <nav className="flex flex-col space-y-4">
                <NavItems
                  onClick={() => {
                    const closeButton = document.querySelector(
                      '[data-state="open"] button[data-state="closed"]'
                    ) as HTMLButtonElement | null;
                    closeButton?.click();
                  }}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
