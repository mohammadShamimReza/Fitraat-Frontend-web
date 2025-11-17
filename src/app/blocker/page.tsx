"use client";

import { useState } from "react";
import FancyLoading from "../loading";

export default function BlockerEmbed() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Online Blocker Instructions
      </h2>

      <p className="text-gray-700 text-center mb-6 max-w-2xl">
        You can view the full instructions directly from the source site below:
      </p>

      <div className="w-full max-w-6xl h-[80vh] border border-gray-300 rounded-xl overflow-hidden shadow-lg relative">
        {/* Loader */}
        {loading && <FancyLoading />}

        <iframe
          src="https://kahfguard.com/"
          title="Kahf Online Instructions"
          className="w-full h-full"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          frameBorder="0"
          onLoad={() => setLoading(false)}
        />
      </div>

      <p className="text-gray-500 mt-4 text-sm">
        Note: Some sites may restrict embedding due to X-Frame-Options. If it
        doesn’t display, visit the site directly.
      </p>
    </div>
  );
}
