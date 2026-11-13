"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const page = () => {
  return (
    <div className="bg-[url('/images/bg.jpg')] bg-center bg-cover bg-whit ">
      <div className="h-full w-full bg-white/40">
        <div className="container mx-auto px-4 py-5">
          <div className=" bg-none md:bg-[url('/images/learning.png')] md:bg-right md:bg-no-repeat md:bg-[length:60%] ">
            <div className="flex flex-col justify-center space-y-10 h-screen max-w-[400px] md:max-w-[600px]">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl"
              >
                Master New Skills Anytime, Anywhere <span className="text-orange-300">— Built for Modern Learning</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-600 text-2xl"
              >
                Explore curated, expert-led video courses designed to accelerate your growth. Whether you're picking up a new technology or sharpening your craft, browse our structured curriculum, dive straight into seamless video lectures, and start learning immediately—no friction, no barriers.
              </motion.p>
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Link href="#" className="px-3 py-2 bg-orange-300 hover:bg-orange-400 transition font-bold hover:text-grey-700">Explore more</Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default page;