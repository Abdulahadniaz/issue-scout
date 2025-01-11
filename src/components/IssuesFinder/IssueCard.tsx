import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";

interface IssueCardProps {
  title: string;
  body: string;
  url: string;
  repoUrl?: string;
  stars?: number;
}

const queryClient = new QueryClient();

export function IssueCard({
  title,
  body,
  url,
  repoUrl,
  stars,
}: IssueCardProps) {
  const repo = repoUrl ?? "unknown";

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm sm:text-[14px] line-clamp-2 sm:line-clamp-1"
          >
            {title}
          </a>
          <div className="flex items-center gap-2">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 text-xs sm:text-[12px] underline"
            >
              {repo.slice(0, 15) + (repo.length > 15 ? "..." : "")}
            </a>
            {stars && (
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-gray-600 text-xs sm:text-[12px]">
                  {stars}
                </span>
                <Image
                  src="/github-mark.svg"
                  alt="GitHub"
                  width={16}
                  height={16}
                />
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-600 mt-2 text-xs sm:text-[12px] line-clamp-3 sm:line-clamp-2">
          {body}
        </p>
      </div>
    </QueryClientProvider>
  );
}
