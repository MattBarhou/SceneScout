import { getTrendingTVShows } from "@/helpers/helpers";
import RegularMovieGrid from "@/components/RegularMovieGrid";

export default async function Home() {
  const trendingTv = await getTrendingTVShows();

  const filteredTv = trendingTv.filter((tv) => tv.poster_path);
  //console.log(filteredTv);

  return <RegularMovieGrid mediaType="Trending TV" media={filteredTv} />;
}
