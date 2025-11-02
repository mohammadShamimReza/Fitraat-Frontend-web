"use client";

import comingSoonIllustration from "@/app/assets/comingsoon.png"; // 👈 your image
import { HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ComingSoonPage: React.FC = () => {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b  px-6 text-center">
      {/* Illustration */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 mb-8">
        <Image
          src={comingSoonIllustration}
          alt="Coming Soon Illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
        🚧 Coming Soon
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 max-w-md mb-8">
        We’re working hard to bring this new page to life. Stay tuned —
        something exciting is on the way!
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" >
          <Button
            type="default"
            size="large"
            icon={<HomeOutlined />}
            onClick={() => router.push("/")}
            className="px-8"
          >
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <p className="text-gray-400 text-sm mt-12">
        © {new Date().getFullYear()} Fitraat. All rights reserved.
      </p>
    </main>
  );
};

export default ComingSoonPage;
