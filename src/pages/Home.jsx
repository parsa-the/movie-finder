import { useEffect, useState } from "react";
import SearchComp from "../components/Search";
import { getTrendingMovies, updatesearchcount } from "../appwrite";
import TrendingMovies from "../components/TrendingMovies";
import MoviesList from "../components/MoviesList";
import Footer from "../components/Footer";
import DarkVeil from "../components/Background";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    toast.info("If you are from Iran, please turn on your VPN!");
  }, []);

  useEffect(() => {
    fetchMovies(search);
  }, [search]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const res = await fetch(endpoint, API_OPTIONS);
      if (!res.ok) throw new Error("Failed to fetch data from TMDB");

      const data = await res.json();
      if (!data.results) throw new Error("No movies found");

      setMovieList(data.results || []);

      if (query && data.results.length > 0) {
        await updatesearchcount(query, data.results[0]);
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#05000a]/95 to-[#0a0814]/95 relative">
      <div className="absolute top-0 left-0 right-0 h-[600px] z-0">
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

      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-5 py-12 xs:p-10 flex flex-col w-full">
        <header className="text-center flex flex-col items-center mt-5 sm:mt-10">
          <h1 className="text-white font-extrabold text-5xl sm:text-6xl sm:w-[42rem] mb-5 text-center leading-tight">
            Find{" "}
            <span className="relative p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 font-bebas tracking-wide">
              <span className="bg-gradient-to-t from-violet-400 to-purple-400 bg-clip-text text-transparent">
                movies
              </span>
            </span>{" "}
            you'll Enjoy Without the Hassle
          </h1>

          <p className="text-zinc-400 text-md mb-10 sm:w-[38rem] leading-relaxed">
            See the newest and most popular movies from the most complete movie
            database!
          </p>

          <SearchComp searchTerm={search} setSearchTerm={setSearch} />
        </header>

        <TrendingMovies movies={trendingMovies} />
        <MoviesList
          movies={movieList}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
