import React, { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="min-h-[56px] bg-[#191A1C]" />}>
        <Navbar />
      </Suspense>
      {children}
      <Footer />
    </>
  );
}
