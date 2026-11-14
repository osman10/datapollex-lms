'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import { motion } from "framer-motion";
import SigninStatus from "./SigninStatus";

const Navbar = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/courses", label: "Courses" },
        { href: "/get-lecture", label: "Dashboard" },

    ];

    return (
        <div
            className="bg-[#191A1C] py-3"
        >
            <div className="container mx-auto flex justify-between items-center px-4 lg:px-0">
                {/* Logo  */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                        delay: 1
                    }}
                >
                    <Logo />
                </motion.div>
                {/* Desktop Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 12,
                        delay: 1.2
                    }}
                className="hidden md:flex gap-4 ">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition-colors ${isActive
                                    ? "text-orange-300 font-semibold"
                                    : "text-white hover:text-orange-300"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </motion.div>

                {/* Signin or signup button */}
                <SigninStatus/>



                {/* Hamburger Menu */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                        delay: 1.2
                    }}
                    className="md:hidden">
                    <button
                        className="text-white focus:outline-none cursor-pointer hover:text-dark-orange transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </motion.div>
            </div>





            {/* Mobile Navigation */}
            <div
                className={`md:hidden fixed top-0 right-0 z-50 bg-white w-[240px] h-screen py-4 flex flex-col justify-center items-center gap-2 shadow-2xl transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-dark-orange transition-colors"
                    aria-label="Close menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <div className="px-4 lg:px-0 mt-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block py-2 transition-colors text-center ${isActive
                                    ? "text-dark-orange font-semibold"
                                    : "text-gray-500 hover:text-dark-orange"
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default Navbar;