const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function getLatestMovies() {
  const response = await fetch(
    `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.results;
}

export async function searchMovies(query) {
  const response = await fetch(
    `${API_URL}/search/multi?api_key=${API_KEY}&query=${query}&language=en-US`
  );
  const data = await response.json();
  // Only return results with poster images
  return data.results.filter((item) => item.poster_path);
}

export async function getMediaDetails(id) {
  // First check if it's a TV show by trying the TV endpoint
  try {
    const tvResponse = await fetch(
      `${API_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`
    );
    if (tvResponse.ok) {
      const data = await tvResponse.json();
      return { ...data, isTV: true };
    }
  } catch (error) {
    console.log("TV fetch failed, trying movie...");
  }

  // If TV fails, try movie endpoint
  try {
    const movieResponse = await fetch(
      `${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    );
    if (movieResponse.ok) {
      const data = await movieResponse.json();
      return { ...data, isTV: false };
    }
  } catch (error) {
    console.log("Movie fetch failed");
  }

  throw new Error("Content not found");
}

export async function getMediaVideos(id) {
  // Try TV endpoint first
  try {
    const tvResponse = await fetch(
      `${API_URL}/tv/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    if (tvResponse.ok) {
      const data = await tvResponse.json();
      return data.results;
    }
  } catch (error) {
    console.log("TV videos fetch failed, trying movie...");
  }

  // Try movie endpoint if TV fails
  try {
    const movieResponse = await fetch(
      `${API_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );
    if (movieResponse.ok) {
      const data = await movieResponse.json();
      return data.results;
    }
  } catch (error) {
    console.log("Movie videos fetch failed");
  }

  return []; // Return empty array if both fail
}

// Trending Movies
export async function getTrendingMovies() {
  try {
    const res = await fetch(
      `${API_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`
    );
    if (!res.ok) throw new Error("Failed to fetch trending movies");
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log("Trending movies fetch failed");
  }
}

// Trending TV Shows
export async function getTrendingTVShows() {
  try {
    const res = await fetch(
      `${API_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`
    );
    if (!res.ok) throw new Error("Failed to fetch trending TV shows");
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log("Trending TV shows fetch failed");
  }
}

// Top Rated Movies
export async function getTopRatedMovies() {
  try {
    const res = await fetch(
      `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!res.ok) throw new Error("Failed to fetch top-rated movies");
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log("Top rated movies fetch failed");
  }
}

// Top Rated TV Shows
export async function getTopRatedTVShows() {
  try {
    const res = await fetch(
      `${API_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    if (!res.ok) throw new Error("Failed to fetch top-rated TV shows");
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.log("Top rated TV shows fetch failed");
  }
}
