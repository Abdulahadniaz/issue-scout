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
  const repo = repoUrl?.split("/")?.[4] ?? "unknown";

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-[14px]"
          >
            {title.slice(0, 80) + (title.length > 80 ? "..." : "")}
          </a>
          <div className="flex items-center gap-1">
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 text-[12px] underline"
            >
              {repo.slice(0, 15) + (repo.length > 15 ? "..." : "")}
            </a>
            {stars && (
              <div className="flex items-center justify-between gap-1">
                <span className="text-gray-600 text-[12px]">{stars}</span>
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
        <p className="text-gray-600 mt-1 text-[12px]">
          {body?.slice(0, 100) + (body?.length > 100 ? "..." : "")}
        </p>
      </div>
    </QueryClientProvider>
  );
}
