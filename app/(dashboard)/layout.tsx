import { Suspense, type ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
import DashboardSidebar from "../components/DashboardSidebar";

async function AuthenticatedDashboard({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

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

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<main className="min-h-screen bg-orange-50" />}>
      <AuthenticatedDashboard>{children}</AuthenticatedDashboard>
    </Suspense>
  );
}
