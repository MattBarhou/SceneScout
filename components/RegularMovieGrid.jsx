import MediaInfoCard from "./MediaInfoCard";

export default function RegularMovieGrid({ mediaType, media }) {
  return (
    <div className="relative z-10">
      {/* Divider */}
      <div className="relative mb-12">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700/50"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="px-6 py-2 bg-gray-800 rounded-full text-gray-400 text-sm border border-white/10">
            Trending {mediaType}
          </span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {media?.map((movie) => (
          <MediaInfoCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
