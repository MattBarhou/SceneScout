import RegularMovieGrid from "@/components/RegularMovieGrid";
import { getTopRatedMovies } from "@/helpers/helpers";

export default async function Home() {
  const movies = await getTopRatedMovies();
  const filteredMovies = movies.filter((movie) => movie.poster_path);
  // console.log(filteredMovies);

  return (
    <RegularMovieGrid mediaType="Top Rated Movies" media={filteredMovies} />
  );
}
