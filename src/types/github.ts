export interface GitHubIssue {
    title: string;
    body: string;
    url: string;
    repoUrl?: string;
    stars?: number; html_url: string;
}

export type SearchMethod = 'url' | 'ownerRepoName'; 