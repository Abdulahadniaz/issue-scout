export interface GitHubIssue {
    id: number;
    title: string;
    body: string;
    html_url: string;
}

export type SearchMethod = 'url' | 'ownerRepoName'; 