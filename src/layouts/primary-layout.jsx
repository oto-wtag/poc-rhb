import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const PrimaryLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="bg-background h-full flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PrimaryLayout;
