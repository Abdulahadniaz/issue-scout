import { GitHubIssue } from "@/types/github";

interface IssueCardProps {
  issue: GitHubIssue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const { html_url } = issue;
  const org = html_url.split("/")[3];
  const repo = html_url.split("/")[4];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center">
        <a
          href={issue.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-[14px]"
        >
          {issue.title.slice(0, 100)}...
        </a>
        <a
          href={`https://github.com/${org}/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 text-[12px] underline"
        >
          {repo}
        </a>
      </div>
      <p className="text-gray-600 mt-1 text-[12px]">
        {issue.body?.slice(0, 120)}...
      </p>
    </div>
  );
}
