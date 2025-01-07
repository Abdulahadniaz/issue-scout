import { Octokit } from '@octokit/rest';
import { NextApiRequest, NextApiResponse } from 'next';

const octokit = new Octokit()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { owner, repo } = req.query;

    if (!owner || !repo) {
        return res.status(400).json({ message: 'Enter a valid GitHub repository URL' });
    }

    try {
        // issue which are open and have the label good first issue
        const response = await octokit.request('GET /repos/{owner}/{repo}/issues?labels=good+first+issue&state=open', {
            owner: owner as string,
            repo: repo as string,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        if (!response.data) {
            throw new Error('Failed to fetch from GitHub API');
        }

        return res.status(200).json(response.data);
    } catch (error: unknown) {
        return res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
}