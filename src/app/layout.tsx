"use client";
import CookieConsent from "@/components/shared/CookieConsent";
import Footer from "@/components/structure/Footer";
import NavBar from "@/components/structure/NavBar";
import Providers from "@/lib/Providers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import localFont from "next/font/local";
import Head from "next/head";
import React from "react";
import "./globals.css";

import FeatureRequestPopup from "@/components/shared/FeactureRequest";
import Hero from "@/components/structure/Hero";
import Support from "@/components/structure/Support";
import { ConfigProvider } from "antd";

// If loading a variable font, you don't need to specify the font weight
const quicksand = localFont({
  src: [
    {
      path: "../../public/fonts/Quicksand/Quicksand-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Quicksand/Quicksand-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Quicksand/Quicksand-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-quicksand",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en" className={quicksand.className}>
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
            <ConfigProvider
              theme={{
                token: {
                  fontFamily: quicksand.style.fontFamily,
                },
              }}
            >
              <Support />

              <NavBar />

              <Hero />

              <div className="mx-auto max-w-6xl">{children}</div>
              <Footer />
              <CookieConsent />
              <FeatureRequestPopup />
            </ConfigProvider>
          </AntdRegistry>
        </body>
      </html>
    </Providers>
  );
}
