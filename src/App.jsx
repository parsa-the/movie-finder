import { useEffect, useState } from "react";
import SearchComp from "./components/Search";
import { getTrendingMovies, updatesearchcount } from "./appwrite";
import TrendingMovies from "./components/TrendingMovies";
import MoviesList from "./components/MoviesList";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // styles for toast

const App = () => {
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const notify = () =>
    toast.info("If you are from Iran please turn on your VPN!");

  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    notify();
  }, []);

  useEffect(() => {
    fetchMovies(search);
  }, [search]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchMovies = async (query = "") => {
    setisLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const res = await fetch(endpoint, API_OPTIONS);
      if (!res.ok) throw new Error("Problem fetching data!");

      const data = await res.json();
      if (data.success === false) {
        setErrorMessage(data.status_message || "Failed to fetch movies");
        setmovieList([]);
        return;
      }

      const results = data.results || [];
      setmovieList(results);

      if (query && results.length > 0) {
        await updatesearchcount(query, results[0]);
      }
    } catch (err) {
      const msg = `Error fetching movies: ${err.message}`;
      console.error(msg);
      toast.error(msg);
      setErrorMessage(msg);
    } finally {
      setisLoading(false);
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#05000a]/[0.97] to-[#0a0814]/[0.97]">
      {/* Toast container renders all toasts */}
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="absolute inset-0 bg-center bg-cover z-0" />
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-5 py-12 xs:p-10 flex flex-col w-full">
        <header className="text-center flex flex-col items-center mt-5 sm:mt-10">
          <h1 className="text-white font-extrabold text-5xl sm:text-6xl sm:w-[42rem] mb-5 text-center leading-tight">
            Find
            <span className="bg-gradient-to-t from-blue-100 animate-pulse  to-purple-500 bg-clip-text text-transparent drop-shadow-md">
              
            {" "} movies {" "}
            </span>
            you'll Enjoy Without the Hassle
          </h1>

          <p className="text-zinc-400 text-md mb-30 sm:w-100">
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

export default App;
