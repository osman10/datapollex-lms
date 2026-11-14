"use client";

import { authClient } from "../lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SigninStatus = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    if (isPending) {
        return <div className="text-sm text-gray-500">Loading...</div>;
    }

    return (
        <div>
            {session ? (
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-white hidden md:block">
                        Hello, {session.user.name}
                    </span>
                    <button
                        onClick={async () => {
                            await authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        router.push("/signin");
                                    },
                                },
                            });
                        }}
                        className="px-3 py-2 text-sm font-medium text-white bg-red-600  hover:bg-red-700 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <Link
                    href="/signin"
                    className="px-3 py-2 text-sm font-medium text-white bg-orange-300  hover:bg-orange-400 transition-colors inline-block"
                >
                    Sign In
                </Link>
            )}
        </div>
    );
};

export default SigninStatus;