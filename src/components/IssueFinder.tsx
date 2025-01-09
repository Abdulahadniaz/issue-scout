"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SearchForm } from "./IssuesFinder/SearchForm";
import IssuesList from "./IssuesFinder/IssuesList";
import { SearchMethod } from "@/types/github";
import { getParamsFromUrl } from "@/lib/utils";

export default function IssueFinder() {
  const [searchMethod, setSearchMethod] = useState<SearchMethod>("url");
  const [repoUrl, setRepoUrl] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [repoName, setRepoName] = useState("");
  const [formError, setFormError] = useState("");
  const [isTopReposActive, setIsTopReposActive] = useState(false);

  const gfiOfARepo = async () => {
    const params =
      searchMethod === "url"
        ? getParamsFromUrl(repoUrl)
        : { owner: ownerName, repo: repoName };

    const response = await fetch(
      `/api/issues/good-first-issues?owner=${params.owner}&repo=${params.repo}`
    );
    const data = await response.json();

    if (!response.ok) {
      setFormError(data.message || "Failed to fetch issues");
      throw new Error(data.message || "Failed to fetch issues");
    }
    return data;
  };

  const topReposGFIs = async () => {
    const response = await fetch("/api/issues/top-repos-gfis");
    const data = await response.json();

    if (!response.ok) {
      console.log(data.message);
      setFormError(data.message || "Failed to fetch issues");
      throw new Error(data.message || "Failed to fetch issues");
    }
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsTopReposActive(false);
    searchIssues();
  };

  const { data: topReposIssues, isLoading: isTopReposLoading } = useQuery({
    queryKey: ["top_repos_gfis"],
    queryFn: topReposGFIs,
  });

  const {
    data: searchResults,
    refetch: searchIssues,
    isRefetching: isSearching,
    isLoading: isManualSearchLoading,
  } = useQuery({
    queryKey: ["gfi_of_repo"],
    queryFn: gfiOfARepo,
    enabled: false,
    retry: false,
  });

  return (
    <div className="h-[calc(100vh-100px)] flex max-w-6xl justify-center mx-auto">
      <div className="w-1/3 p-6">
        <h5 className="font-bold mb-4">
          Find a &apos;good first issue&apos; and start contributing to open
          source
        </h5>

        <SearchForm
          selectedMethod={searchMethod}
          onMethodChange={setSearchMethod}
          onSubmit={handleSubmit}
          isLoading={isSearching}
          formError={formError}
          urlProps={{
            value: repoUrl,
            onChange: (e) => setRepoUrl(e.target.value),
          }}
          ownerRepoProps={{
            owner: ownerName,
            repo: repoName,
            onOwnerChange: (e) => setOwnerName(e.target.value),
            onRepoChange: (e) => setRepoName(e.target.value),
          }}
        />
      </div>

      <div className="border-l border-gray-200 mt-[-16px] mb-[-200px]" />

      <IssuesList
        isTopReposActive={isTopReposActive}
        onToggleTopRepos={() => setIsTopReposActive(!isTopReposActive)}
        topReposIssues={topReposIssues}
        isTopReposLoading={isTopReposLoading}
        searchResults={searchResults}
        isSearching={isSearching || isManualSearchLoading}
      />

      <div className="border-r border-gray-200 mt-[-16px] mb-[-200px]" />
    </div>
  );
}
