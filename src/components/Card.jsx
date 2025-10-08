import { Link } from "react-router-dom";

const Card = ({
  Movie: {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  },
}) => {
  return (
    <Link to={`/movie/${id}`}>
      <div className="bg-[rgba(15,13,35,0.55)] backdrop-blur-[16px] backdrop-saturate-180 border border-white/20 p-5 rounded-2xl shadow-inner shadow-white/10 transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-[0_8px_32px_rgba(31,38,135,0.25)] hover:backdrop-blur-[24px] hover:backdrop-saturate-[200%]">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
          alt={title}
          className="w-full h-auto rounded-lg object-cover"
        />

        <div className="text-white mt-4">
          <h3 className="text-base font-bold truncate">{title}</h3>

          <div className="flex flex-row items-center flex-wrap gap-2 mt-2">
            <div className="flex flex-row items-center gap-1">
              <img
                src="star.svg"
                alt="star icon"
                className="w-4 h-4 object-contain"
              />
              <p className="text-white font-bold text-base">
                {vote_average?.toFixed(1) ?? "N/A"}
              </p>
              <span className="text-gray-100 text-sm">.</span>
              <p className="capitalize text-gray-100 font-medium text-base">
                {original_language || "—"}
              </p>
              <span className="text-gray-100 text-sm">.</span>
              <p className="text-gray-100 font-medium text-base">
                {release_date ? release_date.split("-")[0] : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
