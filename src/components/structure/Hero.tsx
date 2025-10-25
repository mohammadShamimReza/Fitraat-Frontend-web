import { Button } from "antd";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import bannerImage from "./../../app/assets/banner.webp";

export default function Hero() {
    const siteUrl = usePathname();
    if(siteUrl == "/") {
         return (
           <div
             className="relative flex items-center justify-center min-h-screen  md:h-[600px]  bg-cover bg-center bg-no-repeat overflow-hidden"
             style={{
               backgroundImage: `url(${bannerImage.src})`,
               width: "100% !important",
             }}
           >
             {/* Blur and Dark Overlay */}
             <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

             {/* Animated Shapes */}
             <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse -top-10 -left-20"></div>
             <div className="absolute w-72 h-72 bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 rounded-full blur-3xl opacity-30 animate-pulse delay-200 -bottom-10 -right-10"></div>

             {/* Text Content */}
             <div
               className="relative z-10 text-center max-w-4xl px-6 text-white animate-fadeInUp"
               style={{
                 animation: "fadeInUp 1.5s ease-out forwards",
               }}
             >
               <h1
                 className="text-4xl md:text-6xl font-bold mb-6 animate-slideIn"
                 style={{
                   animation: "slideIn 1s ease-out forwards",
                 }}
               >
                 Recover Your Life from Porn Addiction
               </h1>

               <Link href="/tasks">
                 <Button
                   type="primary"
                   className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-transform transform hover:scale-105"
                 >
                   Get Started Now
                 </Button>
               </Link>
             </div>

             {/* Keyframes for Animations */}
             <style jsx>{`
               @keyframes fadeIn {
                 0% {
                   opacity: 0;
                 }
                 100% {
                   opacity: 1;
                 }
               }

               @keyframes fadeInUp {
                 0% {
                   opacity: 0;
                   transform: translateY(20px);
                 }
                 100% {
                   opacity: 1;
                   transform: translateY(0);
                 }
               }

               @keyframes slideIn {
                 0% {
                   opacity: 0;
                   transform: translateX(-30px);
                 }
                 100% {
                   opacity: 1;
                   transform: translateX(0);
                 }
               }
             `}</style>
           </div>
         );
    } else {
        return null;
    }
 
}
