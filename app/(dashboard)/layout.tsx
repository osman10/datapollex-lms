import { ReactNode } from "react";
import DashboardSidebar from "../components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (

      <main className="flex min-h-screen flex-col md:flex-row">
        <DashboardSidebar />
        <div className="bg-[url('/images/bg.jpg')] bg-center bg-cover bg-white w-full min-w-0 flex-1">
          {children}

       
        </div>
      </main>
  );
}


// bg-[url('/images/bg.jpg')] bg-center bg-cover bg-white