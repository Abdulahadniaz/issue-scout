import { topRepos } from '@/util/topRepos';
import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const ownerAndRepos = topRepos.map(repo => {
        const urlParts = repo.split("github.com/")[1]?.split("/");
        if (!urlParts || urlParts.length < 2)
            throw new Error("Invalid GitHub URL");
        const [ownerName, repoName] = urlParts;
        return { ownerName, repoName };
    })

    const gfis = await Promise.all(ownerAndRepos.map(async (repo) => {
        const response = await octokit.request('GET /repos/{owner}/{repo}/issues?labels=good+first+issue&state=open', {
            owner: repo.ownerName,
            repo: repo.repoName,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        return response.data
    }))

    const flattenedGfis = []
    for (const gfi of gfis) {
        flattenedGfis.push(...gfi)
    }

    if (flattenedGfis.length === 0) {
        return res.status(200).json([])
    }

    return res.status(200).json(flattenedGfis)

}