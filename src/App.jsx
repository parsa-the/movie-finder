import { use, useEffect, useState } from "react";
import SearchComp from "./components/Search";
import Loading from "./components/Loading";
import ColourfulHeader from "./components/ColourfulHeader";
import Card from "./components/Card";
import { getTrendingMovies, updatesearchcount } from "./appwrite";
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

  //hooks
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
      if (!Response.ok) {
        throw new Error("problem with fetching data!");
      }
      const Data = await Response.json();
      console.log(Data);
      if (Data.Response === false) {
        setErrorMessage(Data.Error || "failed to fetch Movies");
        setmovieList([]);
        return;
      }
      setmovieList(Data.results || []);
      if (query && Data.results.length > 0) {
        await updatesearchcount(query, Data.results[0]);
      }
    } catch (error) {
      console.error(`error fetching movies: ${error}`);
      setErrorMessage(`error fetching movies: ${error}`);
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
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  //jsx
  return (
    <main className="justify-center">
      <div className="patterns" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero banner" />
          <header className="items-center justify-center">
            <ColourfulHeader
              text="Find movies you'll Enjoy Without the Hassle"
              className="text-5xl mb-8 font-bold font-dm-sans"
            />
          </header>
          <SearchComp searchTerm={search} setSearchTerm={setSearch} />
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul className="trending-movies">
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.searchTerm} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="all-movies">
          <h2>All movies</h2>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <Card key={movie.id} Movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
      <footer className="text-center py-6 text-gray-400 text-sm">
        <p>
          © 2025 Movie Finder. All rights reserved. |
          <a
            href="https://github.com/parsa-the"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition-colors ml-1 inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </p>
        <p className="mt-1">Powered by TMDB API</p>
      </footer>
    </main>
  );
};

export default App;
