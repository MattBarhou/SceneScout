"use client";
import { useEffect, useState, useCallback } from "react";
import RegularMovieGrid from "./RegularMovieGrid";

export default function InfiniteMediaGrid({ apiRoute, mediaType }) {
  const [media, setMedia] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch media for the current page
  const fetchMedia = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const res = await fetch(`${apiRoute}?page=${page}`);
    const data = await res.json();
    setMedia((prev) => [
      ...prev,
      ...data.results.filter((item) => item.poster_path),
    ]);
    setHasMore(page < data.total_pages);
    setLoading(false);
  }, [apiRoute, page, loading, hasMore]);

  // Fetch when page changes
  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  // Infinite scroll handler
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.offsetHeight &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <>
      <RegularMovieGrid mediaType={mediaType} media={media} />
      {loading && <div className="text-center my-4">Loading...</div>}
      {!hasMore && <div className="text-center my-4">No more results!</div>}
    </>
  );
}
