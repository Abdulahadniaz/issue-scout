import Header from "@/components/Header";
import { IssueCard } from "@/components/IssuesFinder/IssueCard";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { createClient } from "@/lib/supabase";
import { useState } from "react";
interface Issue {
  id: string;
  title: string;
  body: string;
  html_url: string;
  repo: {
    full_name: string;
    html_url: string;
    stars: number;
  };
}

const supabase = createClient();
const queryClient = new QueryClient();

function PaginationButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-2 py-1 border rounded-md text-[14px] ${
        disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-50 text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

function IssuesContent() {
  const [page, setPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState("");

  const itemsPerPage = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["all-issues", page],
    queryFn: async () => {
      const from = (page - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const [{ data: issues, error }, { count }] = await Promise.all([
        supabase
          .from("good_first_issues")
          .select(
            `
            id,
            title,
            body,
            html_url,
            repo: repos (
              full_name,
              html_url,
              stars
            )
          `
          )
          .range(from, to),
        supabase
          .from("good_first_issues")
          .select("*", { count: "exact", head: true }),
      ]);

      if (error) throw error;

      return {
        issues: issues as unknown as Issue[],
        totalCount: count || 0,
      };
    },
  });

  const totalPages = Math.ceil((data?.totalCount || 0) / itemsPerPage);

  const handlePrevPage = () => {
    setPage((p) => Math.max(1, p - 1));
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    setPage((p) => Math.min(totalPages, p + 1));
    window.scrollTo(0, 0);
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpToPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      setPage(pageNum);
      setJumpToPage("");
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="h-screen p-4">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-2">
        <h1 className="text-2xl font-bold mb-6">
          Pick a good first issue and get started!
        </h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data?.issues?.map((issue) => (
                <IssueCard
                  key={issue.id}
                  title={issue.title}
                  body={issue.body}
                  url={issue.html_url}
                  repoUrl={issue.repo.html_url}
                  stars={issue.repo.stars}
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-8 mb-8">
              <PaginationButton onClick={handlePrevPage} disabled={page === 1}>
                Previous
              </PaginationButton>

              <span className="text-gray-600 text-[14px]">
                Page {page} of {totalPages}
              </span>

              <form
                onSubmit={handleJumpToPage}
                className="flex items-center gap-2"
              >
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={jumpToPage}
                  onChange={(e) => setJumpToPage(e.target.value)}
                  className="w-16 px-2 py-1 border rounded-md text-[14px]"
                  placeholder="Page"
                />
                <button
                  type="submit"
                  className="px-2 py-1 border rounded-md text-[14px] bg-white hover:bg-gray-50 text-gray-700"
                >
                  Go
                </button>
              </form>

              <PaginationButton
                onClick={handleNextPage}
                disabled={page === totalPages}
              >
                Next
              </PaginationButton>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default function AllIssues() {
  return (
    <QueryClientProvider client={queryClient}>
      <IssuesContent />
    </QueryClientProvider>
  );
}
