import RegularMovieGrid from "@/components/RegularMovieGrid";
import { getTopRatedTVShows } from "@/helpers/helpers";

export default async function Home() {
  const tvShows = await getTopRatedTVShows();
  const filteredShows = tvShows.filter((show) => show.poster_path);
  // console.log(filteredShows);

  return <RegularMovieGrid mediaType="Top Rated TV" media={filteredShows} />;
}
