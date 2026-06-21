function SkeletonHome() {
  return (
    <div className="p-5 animate-pulse">

      <div className="h-14 w-48 bg-[#131C2E] rounded-xl mb-8"></div>

      <div className="h-32 bg-[#131C2E] rounded-3xl mb-6"></div>

      <div className="h-6 w-40 bg-[#131C2E] rounded-xl mb-4"></div>

      {[1,2,3].map((i) => (
        <div
          key={i}
          className="bg-[#131C2E] rounded-3xl p-5 mb-4"
        >
          <div className="flex justify-between">

            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full bg-[#1E293B]"></div>

              <div>
                <div className="h-5 w-32 bg-[#1E293B] rounded mb-2"></div>
                <div className="h-4 w-24 bg-[#1E293B] rounded"></div>
              </div>
            </div>

            <div>
              <div className="h-5 w-12 bg-[#1E293B] rounded mb-2"></div>
              <div className="h-10 w-20 bg-[#1E293B] rounded-xl"></div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonHome;