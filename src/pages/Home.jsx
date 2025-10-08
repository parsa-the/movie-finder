import { useEffect, useState } from "react";
import SearchComp from "../components/Search";
import { getTrendingMovies, updatesearchcount } from "../appwrite";
import TrendingMovies from "../components/TrendingMovies";
import MoviesList from "../components/MoviesList";
import Footer from "../components/Footer";
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

  // Show toast once on load (for Iranian users)
  useEffect(() => {
    toast.info("If you are from Iran, please turn on your VPN!");
  }, []);

  // Fetch movies when search changes
  useEffect(() => {
    fetchMovies(search);
  }, [search]);

  // Fetch trending movies on mount
  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  // Fetch movies (with or without query)
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

      // Update Appwrite search count
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

  // Fetch trending movies from Appwrite backend
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
      {/* Toast notifications */}
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

      {/* Background layer */}
      <div className="absolute inset-0 bg-center bg-cover z-0" />

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-5 py-12 xs:p-10 flex flex-col w-full">
        {/* Header Section */}
        <header className="text-center flex flex-col items-center mt-5 sm:mt-10">
          <h1 className="text-white font-extrabold text-5xl sm:text-6xl sm:w-[42rem] mb-5 text-center leading-tight">
            Find{" "}
            <span className="bg-gradient-to-t from-violet-600 to-purple-400 bg-clip-text text-transparent font-bebas tracking-wide">
              movies
            </span>{" "}
            you'll Enjoy Without the Hassle
          </h1>

          <p className="text-zinc-400 text-md mb-10 sm:w-[38rem] leading-relaxed">
            See the newest and most popular movies from the most complete movie
            database!
          </p>

          <SearchComp searchTerm={search} setSearchTerm={setSearch} />
        </header>

        {/* Movie Sections */}
        <TrendingMovies movies={trendingMovies} />
        <MoviesList
          movies={movieList}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
