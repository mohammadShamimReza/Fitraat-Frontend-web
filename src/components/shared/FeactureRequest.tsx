"use client";

import { useAddFeatureRequestMutation } from "@/redux/api/featureRequestApi";
import { message } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function FeatureRequestPopup() {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState("");
  const [addFeatureRequest, { isLoading }] = useAddFeatureRequestMutation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem("fitraat_feature_request_shown");
    if (saved === "true") return;

    const timer = setTimeout(() => setShow(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShow(false);
    window.localStorage.setItem("fitraat_feature_request_shown", "true");
  };

    const handleSubmit = async () => {
      console.log('hi')
    if (!content.trim()) return;

      try {
        
          if (content !== "") {
            try {
              const result = await addFeatureRequest({
                content: content,
              });

              console.log(result, 'feature request result');
              if (result?.error) {
                message.success("You are already subscribed");
                setContent("");
              } else if (result?.data) {
                setContent("");
                message.success("Thanks for you request");
              }
            } catch (error) {
              if (error) {
                alert("Something went wrong");
              }
            }
          } else {
            message.error("Please enter a message");
          }
          
          

      setContent("");
      closePopup();
    } catch (err) {
      console.error("Feature request error:", err);
    }
  };

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 bg-white shadow-xl rounded-2xl p-5 w-80 border border-gray-200 z-50"
    >
      {/* Close Icon */}
      <button
        onClick={closePopup}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
      >
        <IoClose size={22} />
      </button>

      <h2 className="text-lg font-semibold mb-2">Have a Feature Request?</h2>

      <p className="text-sm text-gray-600 mb-3">
        Tell us what you want to see next in Fitraat!
      </p>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Your idea..."
        className="w-full p-2 border rounded-lg text-sm focus:ring"
        rows={3}
      />

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full mt-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2 rounded-xl text-sm shadow hover:opacity-90 transition"
      >
        {isLoading ? "Submitting..." : "Submit Request"}
      </button>
    </motion.div>
  );
}
