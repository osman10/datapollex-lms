import Logo from "./Logo";
import Link from "next/link";


const DashboardSidebar = () => {
    return (
        <aside className="flex w-full flex-col border-r border-orange-200 bg-orange-50 md:min-h-screen md:w-75">
            <div className="bg-slate-950 px-5 py-4">
                <Logo />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6 p-4">
                <nav aria-label="Dashboard navigation" className="flex flex-row gap-2 overflow-x-auto md:flex-col">
                    <Link href="/dashboard" className="shrink-0 rounded-lg bg-orange-200 px-4 py-3 font-semibold text-slate-900 transition hover:bg-orange-300">
                        Dashboard
                    </Link>
                    <Link href="/dashboard/courses" className="shrink-0 rounded-lg px-4 py-3 font-medium text-slate-700 transition hover:bg-orange-100 hover:text-slate-950">
                        Courses
                    </Link>
                    <Link href="/dashboard/students" className="shrink-0 rounded-lg px-4 py-3 font-medium text-slate-700 transition hover:bg-orange-100 hover:text-slate-950">
                        Students
                    </Link>
                    <Link href="/dashboard/settings" className="shrink-0 rounded-lg px-4 py-3 font-medium text-slate-700 transition hover:bg-orange-100 hover:text-slate-950">
                        Settings
                    </Link>
                </nav>
                <Link href="/login" className="rounded-lg border border-orange-200 px-4 py-3 text-center font-semibold text-slate-700 transition hover:border-orange-300 hover:bg-orange-100">
                    Login
                </Link>
            </div>
        </aside>
    );
};

export default DashboardSidebar;