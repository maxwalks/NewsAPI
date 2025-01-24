export default function Loading() {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 mb-4"></div>
          <p className="text-gray-600">Loading news articles...</p>
        </div>
      </div>
    )
  }