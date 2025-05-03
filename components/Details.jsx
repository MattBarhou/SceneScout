import Image from "next/image";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoStarOutline,
  IoLanguageOutline,
  IoTvOutline,
} from "react-icons/io5";

export default function Details({ movie, videos }) {
  // Check if it's a TV show (has seasons property)
  const isTV = Boolean(movie.seasons);
  const title = isTV ? movie.name : movie.title;
  const releaseDate = isTV ? movie.first_air_date : movie.release_date;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={`${title} backdrop`}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 py-8 flex items-end">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Poster */}
            <div className="relative w-64 aspect-[2/3] rounded-xl shadow-2xl ring-1 ring-white/10 overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 256px"
              />
            </div>

            {/* Title and Quick Info */}
            <div className="flex-1 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {title}
              </h1>
              <p className="text-lg text-purple-400 font-medium mb-6">
                {movie.tagline}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center text-gray-300 gap-2">
                  <IoCalendarOutline className="text-purple-400" />
                  <span>{releaseDate}</span>
                </div>
                {isTV ? (
                  <div className="flex items-center text-gray-300 gap-2">
                    <IoTvOutline className="text-purple-400" />
                    <span>{movie.number_of_seasons} Seasons</span>
                  </div>
                ) : (
                  <div className="flex items-center text-gray-300 gap-2">
                    <IoTimeOutline className="text-purple-400" />
                    <span>{movie.runtime} minutes</span>
                  </div>
                )}
                <div className="flex items-center text-gray-300 gap-2">
                  <IoStarOutline className="text-purple-400" />
                  <span>{movie.vote_average.toFixed(1)} / 10</span>
                </div>
                <div className="flex items-center text-gray-300 gap-2">
                  <IoLanguageOutline className="text-purple-400" />
                  <span>{movie.original_language.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Overview
              </h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </section>

            {/* Seasons Section for TV Shows */}
            {isTV && movie.seasons && (
              <section className="mt-12">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Seasons
                </h2>
                <div className="grid gap-4">
                  {movie.seasons
                    .filter((season) => season.season_number !== 0) // Filter out specials
                    .map((season) => (
                      <div
                        key={season.id}
                        className="bg-gray-800/50 rounded-lg p-4 border border-white/5 flex gap-4"
                      >
                        {season.poster_path ? (
                          <div className="relative w-24 aspect-[2/3] rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                              alt={`${season.name} poster`}
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                          </div>
                        ) : null}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">
                            {season.name}
                          </h3>
                          <p className="text-sm text-gray-400 mb-2">
                            {season.episode_count} Episodes •{" "}
                            {season.air_date?.split("-")[0]}
                          </p>
                          {season.overview && (
                            <p className="text-sm text-gray-300 line-clamp-2">
                              {season.overview}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}

            <hr className="my-12" />

            {/* Videos Section */}
            {videos && videos.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  Videos & Trailers
                </h2>
                <div className="grid gap-6">
                  {videos.map((video) => (
                    <div key={video.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg text-white font-medium">
                            {video.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {video.type} •{" "}
                            {new Date(video.published_at).toLocaleDateString()}
                          </p>
                        </div>
                        {video.official && (
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                            Official
                          </span>
                        )}
                      </div>
                      <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden ring-1 ring-white/10">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.key}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                          className="absolute top-0 left-0 w-full h-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Genres */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-4">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-purple-400 border border-purple-500/20"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </section>

            {/* Networks for TV Shows */}
            {isTV && movie.networks && (
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Networks
                </h3>
                <div className="space-y-4">
                  {movie.networks.map((network) => (
                    <div
                      key={network.id}
                      className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3 border border-white/5"
                    >
                      {network.logo_path ? (
                        <div className="relative w-12 h-12 bg-white rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                            alt={`${network.name} logo`}
                            fill
                            className="object-contain p-1"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-500 text-xl font-bold">
                            {network.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="text-gray-200 font-medium">
                        {network.name}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Production Companies */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-4">
                Production
              </h3>
              <div className="space-y-4">
                {movie.production_companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-3 border border-white/5"
                  >
                    {company.logo_path ? (
                      <div className="relative w-12 h-12 bg-white/5 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={`${company.name} logo`}
                          fill
                          className="object-contain p-1"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-500 text-xl font-bold">
                          {company.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="text-gray-200 font-medium">
                        {company.name}
                      </div>
                      {company.origin_country && (
                        <div className="text-gray-400 text-sm">
                          {company.origin_country}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
