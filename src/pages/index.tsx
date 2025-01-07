"use client";

import IssueFinder from "@/components/IssueFinder";

export default function Home() {
  return (
    <div className="h-screen p-8 overflow-hidden">
      <main className="">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Issue Scout
        </h1>
        <hr className="my-4 mx-[-28px] " />
        <IssueFinder />
      </main>
    </div>
  );
}
