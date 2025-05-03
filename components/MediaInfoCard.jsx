import Image from "next/image";
import Link from "next/link";
import { IoCalendarOutline, IoInformationCircleOutline } from "react-icons/io5";

export default function MediaInfoCard({ movie }) {
  const title = movie.title || movie.name;

  const releaseDate = movie.release_date || movie.first_air_date;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-white/10 transition-colors duration-300 hover:border-purple-500/30">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={title}
        width={500}
        height={750}
        className="w-full h-auto"
        loading="lazy"
      />
      <div className="p-4 bg-gray-800">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        {releaseDate && (
          <p className="text-gray-400 text-sm flex items-center mb-3">
            <IoCalendarOutline className="mr-1" />
            <span>{releaseDate}</span>
          </p>
        )}
        <Link
          href={`/details/${movie.id}`}
          className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-purple-400 py-2 px-4 rounded-lg transition-colors duration-300 border border-purple-500/20 hover:border-purple-500/30"
        >
          <IoInformationCircleOutline className="text-lg" />
          View Details
        </Link>
      </div>
    </div>
  );
}
