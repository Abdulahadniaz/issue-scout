"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Issue = {
  id: number;
  title: string;
  body: string;
  html_url: string;
};

export default function IssueFinder() {
  const [repoUrl, setRepoUrl] = useState("");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [formError, setFormError] = useState("");
  const [ownerNameInput, setOwnerNameInput] = useState("");
  const [repoNameInput, setRepoNameInput] = useState("");
  const [selectedChip, setSelectedChip] = useState("url");

  const { data, refetch, error, isRefetching } = useQuery({
    refetchOnWindowFocus: false,
    enabled: false,
    queryKey: ["gfi_of_repo"],
    queryFn: async () => {
      let ownerParam, repoParam;
      if (selectedChip === "url") {
        const urlParts = repoUrl.split("github.com/")[1]?.split("/");
        if (!urlParts || urlParts.length < 2)
          throw new Error("Invalid GitHub URL");
        const [owner, repo] = urlParts;
        ownerParam = owner;
        repoParam = repo;
      } else {
        ownerParam = ownerNameInput;
        repoParam = repoNameInput;
      }

      const response = await fetch(
        `/api/issues/good-first-issues?owner=${ownerParam}&repo=${repoParam}`
      );
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to fetch issues");
      return data;
    },
  });

  useEffect(() => {
    if (error) {
      setFormError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setIssues(data);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    refetch();
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
        <div className="flex justify-start gap-2 my-2">
          <div
            className={` cursor-pointer p-1 rounded-md ${
              selectedChip === "url"
                ? "bg-gray-200 text-gray-500"
                : "bg-white-500 text-gray-500"
            }`}
            onClick={() => setSelectedChip("url")}
          >
            By URL
          </div>
          <div
            onClick={() => setSelectedChip("ownerRepoName")}
            className={` cursor-pointer p-1 rounded-md ${
              selectedChip === "ownerRepoName"
                ? "bg-gray-200 text-gray-500"
                : "bg-white-500 text-gray-500"
            }`}
          >
            By Name
          </div>
        </div>
        {selectedChip === "url" && (
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="Enter GitHub repository URL"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-300 disabled:text-gray-500"
              disabled={isRefetching}
            >
              Find Issues
            </button>
          </form>
        )}
        {selectedChip === "ownerRepoName" && (
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 mt-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={ownerNameInput}
                onChange={(e) => setOwnerNameInput(e.target.value)}
                placeholder="Enter repo owner"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                value={repoNameInput}
                onChange={(e) => setRepoNameInput(e.target.value)}
                placeholder="Enter repo name"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-300 disabled:text-gray-500"
              disabled={isRefetching}
            >
              Find Issues
            </button>
          </form>
        )}
        {formError && <div className="text-red-500 mt-4">{formError}</div>}
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
