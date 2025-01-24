"use server"

export async function getNews (keyword: string, page: number = 1) {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${process.env.API_KEY}&page=${page}`)
    if (!res.ok) {
        throw new Error(`News API request failed: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()
    return data
}