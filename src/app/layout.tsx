import Footer from "@/components/structure/Footer";
import NavBar from "@/components/structure/NavBar";
import Providers from "@/lib/Providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React from "react";
import "./globals.css";

import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const palastineHelpUrl =
    process.env.NEXT_PUBLIC_PALESTINE_HELP_URL || "palastineHelpUrl";
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Providers>
            <div>
              <div className="w-full bg-gray-800 text-white py-1 px-2 flex justify-center items-center space-x-4 text-xs md:text-sm lg:text-base whitespace-nowrap overflow-hidden">
                <span className="font-semibold">Stand with Palestine 🇧🇩</span>
                <Link target="blank" href={palastineHelpUrl} passHref>
                  <p
                    className="underline font-semibold hover:text-gray-200 transition-colors duration-200"
                    rel="noopener noreferrer"
                  >
                    Support 🇵🇸
                  </p>
                </Link>
              </div>
              <div className="mx-auto max-w-7xl">
                <NavBar />
              </div>
              <div className="mx-auto max-w-6xl">{children}</div>
              <Footer />
            </div>
            {/* <CookieConsent /> */}
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
