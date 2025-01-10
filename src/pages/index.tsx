"use client";

import IssueFinder from "@/components/IssueFinder";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Header";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen p-4 overflow-hidden">
        <main className="">
          <Header />
          <IssueFinder />
        </main>
      </div>
    </QueryClientProvider>
  );
}
