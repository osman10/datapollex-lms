import { type ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
import DashboardSidebar from "../components/DashboardSidebar";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  // Await headers once if required by your Next.js version, or let Better Auth read them
  const requestHeaders = await headers();
  
  const session = await auth.api.getSession({ 
    headers: requestHeaders 
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <DashboardSidebar />
      <div className="bg-[url('/images/bg.jpg')] bg-center bg-cover bg-white w-full min-w-0 flex-1">
        {children}
      </div>
    </main>
  );
}