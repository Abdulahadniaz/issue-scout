"use client";

import IssueFinder from "@/components/IssueFinder";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Issue Scout
        </h1>
        <h2 className="text-xl font-bold mb-8 text-center text-gray-800">
          Find a good first issue and contribute to open source projects
        </h2>
        <IssueFinder />
      </main>
    </div>
  );
}
