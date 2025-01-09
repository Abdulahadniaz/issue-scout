import { GitHubIssue } from "@/types/github";
import { IssuesGrid } from "./IssuesGrid";

export default function IssuesList({
  isTopReposActive,
  onToggleTopRepos,
  topReposIssues,
  isTopReposLoading,
  searchResults,
  isSearching,
}: {
  isTopReposActive: boolean;
  onToggleTopRepos: () => void;
  topReposIssues?: GitHubIssue[];
  isTopReposLoading: boolean;
  searchResults?: GitHubIssue[];
  isSearching: boolean;
}) {
  return (
    <div className="w-2/3 h-full overflow-y-auto">
      <div className="flex justify-between items-center px-6">
        <h2 className="text-xl font-bold text-left">
          Start searching for issues to see results
        </h2>
        <button
          onClick={onToggleTopRepos}
          className={`bg-gray-200 text-gray-500 p-1 rounded-md text-xs cursor-pointer
            ${isTopReposActive ? "bg-gray-500 text-white" : ""}`}
        >
          Top 100 Repos
        </button>
      </div>

      <div className="p-6">
        {isTopReposActive ? (
          isTopReposLoading ? (
            <div>Loading...</div>
          ) : (
            <IssuesGrid
              issues={topReposIssues}
              title="Following are the good first issues from the top 100 repos"
            />
          )
        ) : isSearching ? (
          <div>Searching...</div>
        ) : (
          <IssuesGrid
            issues={searchResults}
            title="Following are the good first issues from your search"
          />
        )}
      </div>
    </div>
  );
}
