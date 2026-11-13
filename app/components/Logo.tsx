import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/" className="inline-block">
            <h1 className="font-bold text-3xl text-white font-jost px-4">
                Logo<span className="text-orange-300">.</span>
            </h1>
        </Link>
    );
};

export default Logo;