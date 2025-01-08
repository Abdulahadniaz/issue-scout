"use client";

import IssueFinder from "@/components/IssueFinder";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen p-4 overflow-hidden">
        <main className="">
          <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
            IssueScout
          </h1>
          <hr className="my-4 mx-[-28px] " />
          <IssueFinder />
        </main>
      </div>
    </QueryClientProvider>
  );
}
