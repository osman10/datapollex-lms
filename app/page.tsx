import Navbar from "./components/Navbar";
import Signup from "./components/Signup";

const page = () => {
  return (
    <div className="bg-[url('/images/bg.jpg')] bg-center bg-cover bg-white h-screen">
      <div className="h-full w-full bg-white/40">
        <Navbar />
        <Signup />
      </div>

    </div>
  );
};

export default page;