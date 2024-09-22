import Navbar from "@/components/navbar";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-8">{children}</div>
    </div>
  );
}
