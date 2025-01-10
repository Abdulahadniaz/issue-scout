"use client";

import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function OrgRepos() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen p-4 overflow-hidden">
        <main className="">
          <Header />
          <div className=" max-w-6xl mx-auto flex items-center justify-center h-full">
            Coming soon...
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}
