"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getNews } from "@/actions/getNews";
import { useState, useEffect, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import NewsArticleCard from "@/components/NewsArticleCard";

function ArticleSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden animate-pulse">
      <div className="h-56 bg-gradient-to-r from-gray-800/50 to-gray-900/50"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-700/50 mb-3 w-1/2 rounded"></div>
        <div className="h-6 bg-gray-700/50 mb-4 w-3/4 rounded"></div>
        <div className="h-3 bg-gray-700/50 mb-2 rounded"></div>
        <div className="h-3 bg-gray-700/50 w-5/6 rounded"></div>
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
  const [data, setData] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = useCallback(async (searchKeyword: string, pageNum: number) => {
    if (!searchKeyword.trim()) return;
    try {
      setIsLoading(true);
      const response = await getNews(searchKeyword, pageNum);
      
      const newArticles = response.articles || [];
      
      if (pageNum === 1) {
        setData(newArticles);
      } else {
        setData(prevData => [...prevData, ...newArticles]);
      }
      
      setHasMore(newArticles.length > 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onSubmit = () => {
    setPage(1);
    fetchNews(keyword, 1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(keyword, nextPage);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >= 
        document.documentElement.scrollHeight &&
        !isLoading &&
        hasMore &&
        keyword
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, keyword]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            News Explorer
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Dive into the latest global insights and breaking stories
          </p>
        </div>

        <div className="flex mb-16 max-w-3xl mx-auto">
          <div className="relative flex-grow mr-4">
            <Input
              type="text"
              placeholder="Enter a keyword (e.g., technology, politics)"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <Button
            onClick={onSubmit}
            disabled={isLoading || !keyword.trim()}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 disabled:opacity-50"
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

        {data.length === 0 && !isLoading && (
          <div className="text-center text-gray-400 text-lg">
            No articles found. Try a different keyword.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((article, idx) => (
            <NewsArticleCard key={`${article.url}-${idx}`} article={article} />
          ))}
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(5)].map((_, idx) => (
              <ArticleSkeleton key={idx} />
            ))}
          </div>
        )}

        {!isLoading && hasMore && data.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              onClick={loadMore}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}