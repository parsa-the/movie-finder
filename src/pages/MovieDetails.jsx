import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "../components/Loading";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            accept: "application/json",
          },
        });
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              accept: "application/json",
            },
          }
        );
        const data = await res.json();
        setReviews(data.results || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [id]);

  if (!movie) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#05000a]/[0.95] to-[#0a0814]/[0.95] py-10 px-5">
      <button
        onClick={() => navigate(-1)}
        className="text-white self-start mb-10 md:ml-60"
      >
        ← Back
      </button>

      <div className="max-w-5xl w-full bg-[rgba(15,13,35,0.55)] backdrop-blur-[16px] border border-white/20 rounded-3xl shadow-lg p-6 sm:p-10 flex flex-col sm:flex-row gap-8">
        <motion.img
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 250, damping: 15 }}
          whileHover={{ scale: 1.01 }}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/no-movie.png"
          }
          alt={movie.title}
          className="w-full sm:w-96 rounded-2xl object-cover shadow-md border border-zinc-500"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 text-white flex flex-col justify-start gap-4"
        >
          <motion.h1 className="text-3xl sm:text-4xl font-extrabold">
            {movie.title}
          </motion.h1>

          {movie.tagline && (
            <motion.p className="italic text-zinc-300">
              "{movie.tagline}"
            </motion.p>
          )}

          <motion.div className="w-16 h-0.5 bg-white rounded-2xl mb-6" />

          <motion.p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {movie.overview}
          </motion.p>

          <div className="flex flex-col border-l pl-4 text-zinc-200 font-medium mt-4 gap-2">
            <p className="flex items-center gap-1">
              ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
            </p>
            <p>
              Release:{" "}
              {movie.release_date
                ? `${movie.release_date.split("-")[0]}/${movie.release_date.split("-")[1]}`
                : "—"}
            </p>
            <p>Language: {movie.original_language?.toUpperCase() ?? "—"}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {movie.genres?.map((genre, i) => (
              <motion.span
                key={genre.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-sm px-3 py-1 rounded-full border border-violet-400 bg-purple-800/20 backdrop-blur-sm"
              >
                {genre.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl w-full mt-35">
        <h2 className="text-3xl font-bold text-white mb-13">Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-zinc-400">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="mb-8 border border-zinc-500 p-3 bg-[rgba(0,0,0,0.3)] rounded-lg"
            >
              <p className="font-bold mb-5 m-1 text-lg text-violet-300">
                {review.author}
              </p>
              <p className="text-zinc-300">{review.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
