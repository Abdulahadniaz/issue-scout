"use client";

import Header from "@/components/Header";
import IssueFinder from "@/components/IssueFinder";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function OrgRepos() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen p-4 overflow-hidden">
        <main className="">
          <Header />
          <IssueFinder type="org" />
        </main>
      </div>
    </QueryClientProvider>
  );
}
