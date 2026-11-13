import Image from "next/image";

const page = () => {
    return (
        <div className="bg-[url('/images/bg.jpg')] bg-center bg-cover bg-white">
            <div className="h-full w-full bg-white/40">
                <div className="container mx-auto px-4 py-5 min-h-screen ">
                    <Image src="/images/Loading_icon.gif" height={300} width={300} alt="Loading"/>
                    <p className="text-center text-gray-500 text-2xl">Wait for a while!    ppppppp</p>
                </div>
            </div>
        </div>
    );
};

export default page;