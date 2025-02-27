import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useIsMobile } from "@/hooks/use-mobile";

const PrimaryLayout = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup
    };
  }, [isMobile]);

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
