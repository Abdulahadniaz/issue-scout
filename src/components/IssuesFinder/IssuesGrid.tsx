import { GitHubIssue } from "@/types/github";
import { IssueCard } from "./IssueCard";

export function IssuesGrid({
  issues,
  title,
}: {
  issues?: GitHubIssue[];
  title: string;
}) {
  if (!issues?.length) return null;

  return (
    <div className="space-y-4">
      <h5 className="font-bold mb-4">{title}</h5>
      {issues.map((issue) => (
        <IssueCard
          key={issue.url}
          title={issue.title}
          body={issue.body}
          url={issue.url}
          repoUrl={issue.url.split("/")[4]}
          stars={issue.stars}
        />
      ))}
    </div>
  );
}
