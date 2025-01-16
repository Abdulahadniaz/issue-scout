"use client";

import IssueFinder from "@/components/IssueFinder";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "@/components/Header";
import { ThemeProvider } from "@/theme/ThemeContext";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="h-screen p-4 overflow-hidden">
          <main className="">
            <Header />
            <IssueFinder />
          </main>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
