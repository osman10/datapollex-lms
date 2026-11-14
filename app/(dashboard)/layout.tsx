import { type ReactNode } from "react";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
import DashboardSidebar from "../components/DashboardSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white" />}>
      <AuthenticatedDashboardLayout>{children}</AuthenticatedDashboardLayout>
    </Suspense>
  );
}

async function AuthenticatedDashboardLayout({ children }: { children: ReactNode }) {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
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