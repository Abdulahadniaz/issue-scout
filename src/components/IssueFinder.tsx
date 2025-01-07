import { useState } from "react";

type Issue = {
  id: number;
  title: string;
  body: string;
  html_url: string;
};

export default function IssueFinder() {
  const [repoUrl, setRepoUrl] = useState("");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const urlParts = repoUrl.split("github.com/")[1]?.split("/");
      if (!urlParts || urlParts.length < 2) {
        throw new Error("Invalid GitHub URL");
      }

      const [owner, repo] = urlParts;
      const response = await fetch(
        `/api/issues/good-first-issues?owner=${owner}&repo=${repo}`
      );
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to fetch issues");
      setIssues(data);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex gap-8">
      <div className="w-1/3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Enter GitHub repository URL"
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            {loading ? "Loading..." : "Find Issues"}
          </button>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
      <div className="w-2/3">
        {issues.length > 0 ? (
          <div className="space-y-4">
            {issues.map((issue: Issue) => (
              <div
                key={issue.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  {issue.title}
                </a>
                <p className="text-gray-600 mt-2 text-sm">
                  {issue.body?.slice(0, 150)}...
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8">
            No issues found. Enter a GitHub repository URL to get started.
          </div>
        )}
      </div>
    </div>
  );
}
