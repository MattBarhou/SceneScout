import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg py-4 px-6 mb-10">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/scenescout.png"
            alt="SceneScout Logo"
            width={40}
            height={40}
            className="rounded-lg"
            priority
          />
          <span className="text-2xl font-bold text-white tracking-tight">
            SceneScout
          </span>
        </Link>
        {/* Navigation Links */}
        <ul className="flex flex-wrap justify-center gap-6">
          <li>
            <Link
              href="/trending-movies"
              className="text-gray-200 font-medium text-lg px-3 py-2 rounded-lg transition-colors hover:bg-purple-600/20 hover:text-purple-400 focus:bg-purple-700/30 focus:text-purple-300"
            >
              Trending Movies
            </Link>
          </li>
          <li>
            <Link
              href="/trending-tv"
              className="text-gray-200 font-medium text-lg px-3 py-2 rounded-lg transition-colors hover:bg-pink-600/20 hover:text-pink-400 focus:bg-pink-700/30 focus:text-pink-300"
            >
              Trending TV Shows
            </Link>
          </li>
          <li>
            <Link
              href="/top-rated-movies"
              className="text-gray-200 font-medium text-lg px-3 py-2 rounded-lg transition-colors hover:bg-blue-600/20 hover:text-blue-400 focus:bg-blue-700/30 focus:text-blue-300"
            >
              Top Rated Movies
            </Link>
          </li>
          <li>
            <Link
              href="/top-rated-tv"
              className="text-gray-200 font-medium text-lg px-3 py-2 rounded-lg transition-colors hover:bg-green-600/20 hover:text-green-400 focus:bg-green-700/30 focus:text-green-300"
            >
              Top Rated TV Shows
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
