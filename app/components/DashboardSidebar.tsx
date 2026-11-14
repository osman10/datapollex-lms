"use client";

import Logo from "./Logo";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "../lib/auth-client"; // Adjust based on your setup

const DashboardSidebar = () => {
    const router = useRouter();
    const pathname = usePathname(); // Get current active route

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                },
            },
        });
    };

    // Navigation items array to make mapping clean and dynamic
    const navItems = [
        { href: "/get-lecture", label: "All Lectures" },
        { href: "/create-lecture", label: "Create Lecture" },
    ];

    return (
        <aside className="flex w-full flex-col border-r border-orange-200 bg-orange-50 md:min-h-screen md:w-75">
            <div className="bg-slate-950 px-5 py-4">
                <Logo />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6 p-4">
                <nav aria-label="Dashboard navigation" className="flex flex-row gap-2 overflow-x-auto md:flex-col">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`shrink-0 rounded-lg px-4 py-3 font-medium transition ${
                                    isActive
                                        ? "bg-orange-200 font-semibold text-slate-950 shadow-sm"
                                        : "text-slate-700 hover:bg-orange-100 hover:text-slate-950"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    className="w-full rounded-lg border border-orange-200 px-4 py-3 text-center font-semibold text-slate-700 transition hover:border-orange-300 hover:bg-orange-100 cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;