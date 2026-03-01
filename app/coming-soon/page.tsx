"use client"; // Required for timers and navigation

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ComingSoonPage() {
  const [seconds, setSeconds] = useState(8); // 5-second countdown
  const router = useRouter();

  useEffect(() => {
    if (seconds <= 0) {
      // The "Redirect" - This will only work if you turn OFF
      // maintenance mode in your middleware/env first!
      router.push("https://www.behance.net/sumitkdesigns/");
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">
        Work In Progress Check Out Behance Page 🚀
      </h1>
      <p className="text-xl">
        Redirecting you to the main site in{" "}
        <span className="font-mono text-blue-600 text-2xl">{seconds}</span>{" "}
        seconds...
      </p>

      {/* Visual Progress Bar (Optional) */}
      <div className="w-64 h-2 bg-gray-200 rounded-full mt-6 overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-1000"
          style={{ width: `${(seconds / 8) * 100}%` }}
        />
      </div>
      <p className="text-xl text-gray-500 mt-4">
        If you are not redirected automatically,{" "}
        <a
          href="https://www.behance.net/sumitkdesigns/"
          className="text-blue-600 underline"
        >
          click here
        </a>
        .
      </p>
    </div>
  );
}
