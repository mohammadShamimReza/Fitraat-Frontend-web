"use client";
import CookieConsent from "@/components/shared/CookieConsent";
import Footer from "@/components/structure/Footer";
import NavBar from "@/components/structure/NavBar";
import Providers from "@/lib/Providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import "./globals.css";

import Hero from "@/components/structure/Hero";
import { Quicksand } from "next/font/google";
import { usePathname } from "next/navigation";

// If loading a variable font, you don't need to specify the font weight
const inter = Quicksand({
  subsets: ["latin-ext"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const palastineHelpUrl = process.env.PALESTINE_HELP_URL || "palastineHelpUrl";
  const siteUrl = usePathname();
  return (
    <Providers>
      <html lang="en" className={inter.className}>
        <Head>
          {/* Global SEO Tags */}
          <title>Fitraat - Discover Your True Potential</title>
          <meta
            name="description"
            content="Welcome to Fitraat! Discover your true potential with our resources and insights tailored to help you grow."
          />
          <meta
            name="keywords"
            content="Fitraat, self-discovery, growth, motivation"
          />
          {/* Open Graph Tags */}
          <meta
            property="og:title"
            content="Fitraat - Discover Your True Potential"
          />
          <meta
            property="og:description"
            content="Learn more about personal growth and self-discovery."
          />
          <meta property="og:image" content="../assets/detox1.png" />
          <meta property="og:url" content="https://fitraat.com" />
          <meta property="og:type" content="website" />

          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Fitraat",
                url: "https:/fitraat.com",
                description: "Discover your true potential with Fitraat.",
                keywords: ["Fitraat", "Self-Discovery", "Motivation"],
              }),
            }}
          />
          <style>{`
            body {
              font-family: 'Times New Roman', Times, serif;
            }
          `}</style>
        </Head>
        <body>
          <AntdRegistry>
            <div className="">
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

              <Hero />

              <div className="mx-auto max-w-6xl">{children}</div>
              <Footer />
            </div>
            <CookieConsent />
          </AntdRegistry>
        </body>
      </html>
    </Providers>
  );
}
