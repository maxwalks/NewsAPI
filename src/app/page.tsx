"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getNews } from "@/actions/getNews";
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import NewsArticleCard from "@/components/NewsArticleCard";

function ArticleSkeleton() {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-56 bg-gradient-to-r from-gray-700 to-gray-800"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-700 mb-3 w-1/2 rounded"></div>
        <div className="h-6 bg-gray-700 mb-4 w-3/4 rounded"></div>
        <div className="h-3 bg-gray-700 mb-2 rounded"></div>
        <div className="h-3 bg-gray-700 w-5/6 rounded"></div>
      </div>
    </div>
  );
}

interface Article {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState<Article[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    if (!keyword.trim()) return;
    try {
      setIsLoading(true);
      const response = await getNews(keyword);
      setData(response.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400 mb-4">
            News Explorer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the latest news and insights from around the world
          </p>
        </div>

        <div className="flex mb-12 max-w-3xl mx-auto">
          <div className="relative flex-grow mr-4">
            <Input
              type="text"
              placeholder="Enter a keyword (e.g., technology, politics)"
              className="w-full pl-10 py-3 rounded-full border-2 border-gray-700 bg-gray-800 text-gray-200 focus:border-indigo-600 transition-all duration-300"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <Button
            onClick={onSubmit}
            disabled={isLoading || !keyword.trim()}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>

        {data && data.length === 0 && (
          <div className="text-center text-gray-400 text-lg">
            No articles found. Try a different keyword.
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(4)].map((_, idx) => (
              <ArticleSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.map((article, idx) => (
              <NewsArticleCard key={idx} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}