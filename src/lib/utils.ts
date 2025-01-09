import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getParamsFromUrl(url: string): { owner: string; repo: string } {
    const urlParts = url.split("github.com/")[1]?.split("/");
    if (!urlParts || urlParts.length < 2) {
        throw new Error("Invalid GitHub URL");
    }
    return {
        owner: urlParts[0],
        repo: urlParts[1],
    };
}