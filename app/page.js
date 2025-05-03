import { getLatestMovies } from "@/helpers/helpers";
import HomeMovieGrid from "@/components/HomeMovieGrid";

export default async function Home() {
  const movies = await getLatestMovies();

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 mb-12 backdrop-blur-sm border border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
            SceneScout
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Discover your next favorite movie or TV show with our intelligent
            search and recommendations
          </p>
        </div>
      </div>

      {/* Movie Grid with Search */}
      <HomeMovieGrid initialMovies={movies} />
    </div>
  );
}
