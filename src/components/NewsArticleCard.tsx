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
    <div className="group relative bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-4xl">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={article.urlToImage || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold text-blue-300 bg-blue-900/30 px-3 py-1 rounded-full">
            {article.source.name}
          </span>
        </div>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-blue-300 transition-colors"
        >
          {article.title}
        </a>
        <p className="text-gray-300 mb-4 line-clamp-3 flex-grow">
          {article.description}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <UserIcon className="h-4 w-4 mr-2 text-blue-400" />
            <span>{article.author || 'Anonymous'}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 text-blue-400" />
            <span>{date}</span>
          </div>
        </div>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-4 flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          Read More 
          <ExternalLinkIcon className="h-4 w-4 ml-2" />
        </a>
      </div>
    </div>
  )
}