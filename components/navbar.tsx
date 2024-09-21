"use client";
import { Car, Menu, Users, X } from "lucide-react";
import { Button } from "./ui/button";
import { SheetTrigger, SheetContent, Sheet } from "./ui/sheet";
import { ModeToggle } from "./mode-toggle";
import { DashboardIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const NavItems = ({ onClick }: { onClick?: () => void }) => (
    <>
      <Button
        asChild
        variant={pathname === "/me" ? "default" : "ghost"}
        onClick={() => {
          onClick?.();
        }}
        className="w-full justify-start"
      >
        <Link href="/me">
          <DashboardIcon className="mr-2 h-4 w-4" />
          Dashboard
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname === "/me/my-car" ? "default" : "ghost"}
        onClick={() => {
          onClick?.();
        }}
        className="w-full justify-start"
      >
        <Link href="/me/my-car">
          <Car className="mr-2 h-4 w-4" />
          My Car
        </Link>
      </Button>
      <Button
        asChild
        variant={pathname === "/me/team" ? "default" : "ghost"}
        onClick={() => {
          onClick?.();
        }}
        className="w-full justify-start"
      >
        <Link href="/me/team">
          <Users className="mr-2 h-4 w-4" />
          Team
        </Link>
      </Button>
      <div>
        <ModeToggle />
      </div>
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
