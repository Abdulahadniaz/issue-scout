import { GitHubIssue } from "@/types/github";

interface IssueCardProps {
  issue: GitHubIssue;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <a
        href={issue.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline font-medium"
      >
        {issue.title}
      </a>
      <p className="text-gray-600 mt-1 text-[12px]">
        {issue.body?.slice(0, 130)}...
      </p>
    </div>
  );
}
