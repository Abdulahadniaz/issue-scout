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
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  const handleSubmit = async (
    e: React.FormEvent,
    submitType: "url" | "ownerRepoName"
  ) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (submitType === "url") {
      const urlParts = repoUrl.split("github.com/")[1]?.split("/");
      if (!urlParts || urlParts.length < 2) {
        throw new Error("Invalid GitHub URL");
      }
      const [owner, repo] = urlParts;
      setOwner(owner);
      setRepo(repo);
    } else if (submitType === "ownerRepoName") {
      setOwner(owner);
      setRepo(repo);
    }

    try {
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
    <div className="h-screen flex max-w-6xl justify-center mx-auto">
      <div className="w-1/3 p-6">
        <h5 className="font-bold mb-4">
          Find a &apos;good first issue&apos; and start contributing to open
          source
        </h5>
        {/* <div className="grid grid-cols-3 gap-1 my-2 ">
          {languages.map((language) => (
            <div key={language} className="bg-gray-200 p-1 rounded-md">
              {language}
            </div>
          ))}
        </div> */}
        <form onSubmit={(e) => handleSubmit(e, "url")} className="space-y-4">
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
        <form
          onSubmit={(e) => handleSubmit(e, "ownerRepoName")}
          className="space-y-4 mt-2"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Enter repo owner"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="Enter repo name"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
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
      <div className="border-l border-gray-200 mt-[-16px] mb-[-200px] "></div>
      <div className="w-2/3 h-full overflow-y-auto">
        <div className="p-6">
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
                  <p className="text-gray-600 mt-1 text-[12px]">
                    {issue.body?.slice(0, 130)}...
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              No issues found. Enter a GitHub repository URL to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// const languages = [
//   // most popular languages
//   "JavaScript",
//   "TypeScript",
//   "Python",
//   "Java",
//   "C#",
//   "Go",
//   "C++",
//   "Ruby",
//   "PHP",
//   "Swift",
//   "Kotlin",
//   "Rust",
// ];
