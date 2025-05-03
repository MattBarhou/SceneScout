"use client";
import { IoSearchOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { searchMovies } from "@/helpers/helpers";

export default function SearchBar({ onSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        onSearchResults(null);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchMovies(searchQuery);
        onSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, onSearchResults]);

  return (
    <div className="relative mb-12">
      <div className="flex items-center bg-gray-800 rounded-xl p-4 shadow-lg border border-white/10 transition-colors duration-300 hover:border-purple-500/30">
        <IoSearchOutline className="text-gray-400 text-xl mr-3" />
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies or TV shows..."
          className="w-full bg-transparent border-none outline-none text-white placeholder-gray-400 text-lg"
        />
        {isSearching && (
          <div className="text-sm text-gray-400">Searching...</div>
        )}
      </div>
    </div>
  );
}
