"use client";
import { useState } from "react";

export default function BlockerInstructions() {
  const [openPanel, setOpenPanel] = useState<string | null>("1");

  const panels = [
    {
      key: "1",
      title: "Windows PC",
      content: [
        "Use hosts file to block sites: C:\\Windows\\System32\\drivers\\etc\\hosts",
        "Install focus apps like Cold Turkey, Freedom, or LeechBlock (for browsers).",
        "Set parental controls in Windows Settings → Family & other users.",
      ],
    },
    {
      key: "2",
      title: "Mac (macOS)",
      content: [
        "Edit hosts file: /etc/hosts",
        "Use Focus apps: Freedom, Cold Turkey, or SelfControl.",
        "Set Screen Time restrictions in System Preferences → Screen Time.",
      ],
    },
    {
      key: "3",
      title: "Linux PC",
      content: [
        "Edit /etc/hosts to block sites.",
        "Install blockers like LeechBlock (browser) or self-made iptables rules.",
        "Use parental control apps like Gnome Nanny or Timekpr-nExT.",
      ],
    },
    {
      key: "4",
      title: "iPhone (iOS)",
      content: [
        "Use Screen Time → Content & Privacy Restrictions → Limit adult content.",
        "Install blocking apps like Freedom or BlockSite.",
        "Disable Safari or other browsers if needed.",
      ],
    },
    {
      key: "5",
      title: "Android Phone",
      content: [
        "Use Digital Wellbeing → Focus mode → Add websites or apps to block.",
        "Install blockers: BlockSite, Stay Focused, or AppBlock.",
        "Use Safe Mode / Guest profile for limited access.",
      ],
    },
    {
      key: "6",
      title: "Router / Network",
      content: [
        "Access your router admin panel (usually 192.168.1.1 or 192.168.0.1).",
        "Add adult or distracting sites to blocklist / parental controls.",
        "Enable time-based restrictions for devices in your network.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8 underline">
          Device <span className="text-red-500">Blocking</span> Instructions
        </h2>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-md mb-10">
          <p className="text-gray-700 font-semibold">
            Follow the instructions below to block access on all your devices
            and improve focus. This includes phones, PCs, routers, and operating
            systems like Windows, Mac, Linux, iOS, and Android.
          </p>
        </div>

        <div className="space-y-4">
          {panels.map((panel) => (
            <div
              key={panel.key}
              className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() =>
                  setOpenPanel(openPanel === panel.key ? null : panel.key)
                }
              >
                <span className="font-medium text-gray-800">{panel.title}</span>
                <span className="text-gray-500">
                  {openPanel === panel.key ? "−" : "+"}
                </span>
              </button>

              {openPanel === panel.key && (
                <div className="p-4 bg-white">
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {panel.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
