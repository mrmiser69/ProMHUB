export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/20 flex items-center justify-center">

      <div className="w-[90%] max-w-md bg-white rounded-3xl p-5 animate-pulse">

        <div className="flex items-center gap-3 mb-5">
          <div className="w-14 h-14 bg-gray-200 rounded-full"></div>

          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        <div className="h-40 bg-gray-200 rounded-3xl mb-5"></div>

        <div className="h-4 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded mb-3 w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded mb-3 w-3/5"></div>
        <div className="h-4 bg-gray-200 rounded mb-3 w-2/5"></div>

        <div className="h-20 bg-gray-200 rounded-2xl mt-5"></div>

      </div>

    </div>
  );
}