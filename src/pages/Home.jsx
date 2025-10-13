import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchComp from "../components/Search";
import TrendingMovies from "../components/TrendingMovies";
import MoviesList from "../components/MoviesList";
import Footer from "../components/Footer";
import DarkVeil from "../components/Background";
import Loading from "../components/Loading";
import { motion } from "framer-motion";
import { getTrendingMovies, updatesearchcount } from "../appwrite";

const Home = () => {
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    toast.info("If you are from Iran, please turn on your VPN!");
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const endpoint = search
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(search)}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

        const res = await fetch(endpoint, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch data from TMDB");

        const data = await res.json();
        if (!data.results) throw new Error("No movies found");

        setMovieList(data.results);

        if (search && data.results.length > 0) {
          await updatesearchcount(search, data.results[0]);
        }
      } catch (err) {
        const msg = `Error fetching movies: ${err.message}`;
        console.error(msg);
        toast.error(msg);
        setErrorMessage(msg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [search, API_BASE_URL, API_KEY, page]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      } catch (err) {
        const msg = `Error fetching trending movies: ${err.message}`;
        console.error(msg);
        toast.error(msg);
        setErrorMessage(msg);
      }
    };

    fetchTrendingMovies();
  }, []);
  function nexPage() {
    setPage((prev) => prev + 1);
  }
  function previousPage() {
    setPage((prev) => Math.max(prev - 1, 1));
  }
  return isLoading ? (
    <Loading />
  ) : (
    <div className="min-h-screen flex flex-col bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-[400px] sm:h-[500px] md:h-[600px] z-0">
        <DarkVeil className="w-full h-full" />
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 flex flex-col w-full">
        <header className="text-center flex flex-col items-center mt-5 sm:mt-10">
          <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl max-w-xl sm:max-w-3xl md:max-w-5xl mb-5 text-center leading-relaxed  sm:leading-snug">
            Find{" "}
            <span className="relative p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 font-bebas tracking-wide">
              <span className="bg-gradient-to-t from-violet-400 to-purple-400 bg-clip-text text-transparent">
                movies
              </span>
            </span>{" "}
            you'll Enjoy Without the Hassle
          </h1>

          <p className="text-zinc-400 text-sm sm:text-md md:text-lg mb-8 sm:mb-10 max-w-xs sm:max-w-md md:max-w-lg">
            See the newest and most popular movies from the most complete movie
            database!
          </p>

          <SearchComp searchTerm={search} setSearchTerm={setSearch} />
        </header>

        <div className="mt-10 sm:mt-12">
          <TrendingMovies movies={trendingMovies} />
        </div>

        <div className="mt-12 sm:mt-16">
          <MoviesList
            movies={movieList}
            isLoading={isLoading}
            errorMessage={errorMessage}
          />{" "}
          {!search && (
            <div className="text-white mt-20 items-center mb-10 flex space-x-7 sm:space-x-13 justify-center">
              <motion.button
                whileHover={{ scale: 0.93, boxShadow: "0px 3px 180px white" }}
                className="bg-violet-600 w-22 p-2 rounded-lg shadow-md border-l-3 border-t-2 font-semibold border-violet-900 border"
                onClick={previousPage}
                disabled={page === 1 || isLoading}
              >
                previous
              </motion.button>
              <motion.span initial={{ textShadow: "0px 0px 20px white" }}>
                page {page}
              </motion.span>
              <motion.button
                whileHover={{ scale: 0.93, boxShadow: "0px 3px 180px white" }}
                onClick={nexPage}
                disabled={isLoading}
                className="bg-violet-600 w-22 p-2 rounded-lg shadow-md border-r-3 border-t-2 font-semibold border-violet-900 border"
              >
                next
              </motion.button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
