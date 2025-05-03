import Details from "@/components/Details";
import { getMediaDetails, getMediaVideos } from "@/helpers/helpers";

export default async function DetailsPage({ params }) {
  const { id } = await params;
  const movie = await getMediaDetails(id);

  let videos = [];
  try {
    const allVideos = await getMediaVideos(id);
    if (allVideos && allVideos.length > 0) {
      // Get all trailers and teasers
      videos = allVideos.filter(
        (video) => video.type === "Trailer" || video.type === "Teaser"
      );
    }
  } catch (error) {
    console.error("Error fetching videos:", error);
  }

  return <Details movie={movie} videos={videos} />;
}
