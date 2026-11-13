import Image from "next/image";

const page = () => {
    return (
        <div className="bg-[url('/images/bg.jpg')] bg-center bg-cover bg-white">
            <div className="h-full w-full bg-white/40">
                <div className="container mx-auto px-4 py-5 min-h-screen">
                    Get lecture
                </div>
            </div>
        </div>
    );
};

export default page;