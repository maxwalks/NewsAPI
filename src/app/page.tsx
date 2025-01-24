"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getNews } from "@/actions/getNews";
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import NewsArticleCard from "@/components/NewsArticleCard";

function ArticleSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-5">
        <div className="h-4 bg-gray-200 mb-2 w-1/2"></div>
        <div className="h-6 bg-gray-200 mb-4 w-3/4"></div>
        <div className="h-3 bg-gray-200 mb-2"></div>
        <div className="h-3 bg-gray-200 w-5/6"></div>
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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">News Explorer</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Search for the latest news articles by keyword
        </p>
      </div>

      <div className="flex mb-8 max-w-2xl mx-auto">
        <Input
          type="text"
          placeholder="Enter a keyword (e.g., technology, politics)"
          className="flex-grow mr-2"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        />
        <Button
          onClick={onSubmit}
          disabled={isLoading || !keyword.trim()}
          className="flex items-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search
            </>
          )}
        </Button>
      </div>

      {data && data.length === 0 && (
        <div className="text-center text-gray-500">
          No articles found. Try a different keyword.
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(4)].map((_, idx) => (
            <ArticleSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((article, idx) => (
              <NewsArticleCard key={idx} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
