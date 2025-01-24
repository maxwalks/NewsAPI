"use server"

export async function getNews (keyword: string) {
    const res = await fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${process.env.API_KEY}&pageSize=4`)
    const data = await res.json()
    return data
}