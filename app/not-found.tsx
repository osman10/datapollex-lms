import Image from "next/image";
import Link from "next/link";

const page = () => {
    return (
        <div className="bg-[url('/images/bg.jpg')] bg-center bg-cover bg-white">
            <div className="h-full w-full bg-white/40">
                <div className="container mx-auto px-4 py-5 min-h-screen flex flex-col  items-center justify-center">
                    <Image src="/images/NotFound.png" height={500} width={400} alt="Not found" />
                    <h1 className="text-[100px] text-gray-400 font-bold">404</h1>
                    <p className="text-4xl text-gray-500  max-w-[600px] text-center">The page or lesson you're looking for doesn't exist or may have been moved.</p>
                    <Link href="/" className="mt-10 px-3 py-2 bg-orange-300 hover:bg-orange-400 transition font-bold hover:text-grey-700">Back to home</Link>
                </div>
            </div>
        </div>
    );
};

export default page;