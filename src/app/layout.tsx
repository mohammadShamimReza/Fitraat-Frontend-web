"use client";
import Footer from "@/components/structure/Footer";
import NavBar from "@/components/structure/NavBar";
import Providers from "@/lib/Providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import React from "react";
import "./globals.css";

import CookieConsent from "@/components/shared/CookieConsent";
import Head from "next/head";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const palastineHelpUrl =
    process.env.NEXT_PUBLIC_PALESTINE_HELP_URL || "palastineHelpUrl";
  return (
    <Providers>
      <html lang="en">
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
            <CookieConsent />
          </AntdRegistry>
        </body>
      </html>
    </Providers>
  );
}
