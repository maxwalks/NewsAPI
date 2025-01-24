import Image from "next/image"
import { CalendarIcon, UserIcon, ExternalLinkIcon } from "lucide-react"

interface NewsArticle {
  source: {
    id: string
    name: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}

export default function NewsArticleCard({ article }: { article: NewsArticle }) {
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={article.urlToImage || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
            {article.source.name}
          </span>
        </div>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-lg font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors"
        >
          {article.title}
        </a>
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {article.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <UserIcon className="h-4 w-4 mr-2" />
            <span>{article.author || 'Anonymous'}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{date}</span>
          </div>
        </div>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-4 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Read More 
          <ExternalLinkIcon className="h-4 w-4 ml-2" />
        </a>
      </div>
    </div>
  )
}