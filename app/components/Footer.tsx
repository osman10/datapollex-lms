import Link from 'next/link';
import Logo from './Logo';
import { FaDiscord, FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoLogoWhatsapp } from 'react-icons/io';




export default function Footer() {
  return (
    <footer className="bg-black bg-[url('/images/bg6.png')] bg-[bottom_center] bg-[length:100%_30%] md:bg-[length:100%_50%] md:bg-[length:100%_100%] bg-no-repeat">
      <div className=" h-full text-[#999999] text-sm pt-16 pb-8 border-t border-[#2a2a2a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top 4-Column Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

            {/* Column 1: Interesting Links */}
            <div className="flex flex-col justify-center h-full">
              <Logo />
              <h1 className='text-white px-4 text-xl'>A Learning platform</h1>
            </div>

            {/* Column 2: Socials */}
            <div className="space-y-4 px-4">
              <h3 className="text-light-orange text-xs font-semibold tracking-wider uppercase">
                Socials
              </h3>
              <div className="space-y-4 text-light-grey">
                {/* social links */}
                <div className="flex flex-col items-start  gap-1 ">
                  <div className="flex flex-col gap-3 ">
                    <div className="flex flex-row items-center gap-2">
                      <Link href="https://www.linkedin.com/in/osmanmirpur/" className="p-2 text-gray-500 border-1 bg-slate-900/50 text-white hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-colors">
                        <FaLinkedinIn />
                      </Link>
                      <p>LinkedIn</p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <Link href="https://discord.com/users/1493113939628658769" className="p-2 text-gray-500 border-1 bg-slate-900/50 text-white hover:border-[#5865F2] hover:bg-[#5865F2] hover:text-white transition-colors">
                        <FaDiscord />
                      </Link>
                      <p>Discord</p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <Link href="https://www.facebook.com/profile.php?id=100003858831991" className="p-2 text-gray-500 border-1 bg-slate-900/50 text-white hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors">
                        <FaFacebook />
                      </Link>
                      <p>Facebook</p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <Link href="https://wa.me/8801737290987" className="p-2 text-gray-500 border-1 bg-slate-900/50 text-white hover:border-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors">
                        <IoLogoWhatsapp />
                      </Link>
                      <p>WhatsApp</p>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <Link href="https://github.com/osman10" className="p-2 text-gray-500 border-1 bg-slate-900/50 text-white hover:border-[#24292e] hover:bg-[#24292e] hover:text-white transition-colors">
                        <FaGithub />
                      </Link>
                      <p>GitHub</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Links */}
            <div className="space-y-6 px-4">
              <div>
                <h3 className="text-light-orange text-xs font-semibold tracking-wider uppercase mb-2">
                  Links
                </h3>
                <ul className="space-y-4 text-xs text-light-grey hover:text-light-grey">
                  <li><Link href="/" className='hover:text-light-orange transation'>Home</Link></li>
                  <li><Link href="#" className='hover:text-light-orange transation'>Explore</Link></li>
                  <li><Link href="#" className='hover:text-light-orange transation'>Dashboard</Link></li>

                </ul>
              </div>
            </div>

            {/* Column 4: Business Hours */}
            <div className="space-y-4 px-4">
              <h3 className="text-light-orange text-xs font-semibold tracking-wider uppercase">
                Contacts
              </h3>
              <p className="text-xs leading-relaxed">
                Our support Hotline is available 24 Hours a day: <span className="text-white font-medium">(88) 01737 290987</span>
              </p>
              <div className="text-xs space-y-1 pt-1">
                <p><strong className="text-gray-300 font-normal">Saturday to Thursday</strong> 9am to 5pm</p>
                <p><strong className="text-gray-300 font-normal">Email:</strong> osman.mirpur55@gmail.com</p>
                <p><strong className="text-gray-300 font-normal">Friday:</strong> Closed</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="bg-black/60 border-t border-[#2a2a2a]">
        <div className='container mx-auto p-2 md:p-4 text-center text-light-grey'>
          <p> Copyright - Osman. All rights reserved 2026</p>
        </div>
      </div>
    </footer>

  );
}
