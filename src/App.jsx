import { useEffect, useState } from "react";
import SearchComp from "./components/Search";
import ColourfulHeader from "./components/ColourfulHeader";
import { getTrendingMovies, updatesearchcount } from "./appwrite";
import TrendingMovies from "./components/TrendingMovies";
import MoviesList from "./components/MoviesList";
import Footer from "./components/Footer";

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

  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);

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
        ? `${API_BASE_URL}/search/movie?query=${query}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const Response = await fetch(endpoint, API_OPTIONS);
      if (!Response.ok) throw new Error("Problem fetching data!");
      const Data = await Response.json();
      if (Data.Response === false) {
        setErrorMessage(Data.Error || "Failed to fetch movies");
        setmovieList([]);
        return;
      }
      setmovieList(Data.results || []);
      if (query && Data.results.length > 0) {
        await updatesearchcount(query, Data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage(`Error fetching movies: ${error.message}`);
    } finally {
      setisLoading(false);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#05000a]/[0.97] to-[#0a0814]/[0.97]">
      {/* background pattern layer */}
      <div className="absolute inset-0 bg-center bg-cover z-0" />

      {/* main content wrapper */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-5 py-12 xs:p-10 flex flex-col w-full">
        {/* header section */}
        <header className="text-center flex flex-col items-center mt-5 sm:mt-10">
          <ColourfulHeader
            text="Find movies you'll Enjoy Without the Hassle"
            className="text-5xl mb-8 font-bold font-dm-sans"
          />
          <SearchComp searchTerm={search} setSearchTerm={setSearch} />
        </header>

        {/* sections */}
        <TrendingMovies movies={trendingMovies} />
        <MoviesList
          movies={movieList}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      </main>

      {/* footer sticks to bottom */}
      <Footer />
    </div>
  );
};

export default App;
