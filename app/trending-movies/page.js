import { getTrendingMovies } from "@/helpers/helpers";
import RegularMovieGrid from "@/components/RegularMovieGrid";

export default async function Home() {
  const movies = await getTrendingMovies();
  //console.log(movies);

  // Filter out items without poster_path
  const filteredMovies = movies.filter((movie) => movie.poster_path);

  return (
    <RegularMovieGrid mediaType="Trending Movies" media={filteredMovies} />
  );
}
