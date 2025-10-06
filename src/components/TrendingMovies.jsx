const TrendingMovies = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold text-white sm:text-3xl mb-4">
        Trending Movies
      </h2>

      <ul
        className="flex flex-row overflow-x-auto gap-5 -mt-10 w-full pb-4 scroll-smooth snap-x snap-mandatory"
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {movies.map((movie, index) => (
          <li
            key={movie.$id}
            className="min-w-[230px] flex flex-row items-center flex-shrink-0 snap-start"
          >
            <p
              className="text-[190px] font-[Bebas Neue] text-white/30 leading-none mr-[-12px]"
              style={{
                WebkitTextStroke: "5px rgba(206,206,251,0.5)",
              }}
            >
              {index + 1}
            </p>
            <img
              src={movie.poster_url}
              alt={movie.searchTerm}
              className="w-[170px] h-[220px] rounded-lg object-cover -ml-3.5 shadow-[0_2px_12px_rgba(40,60,120,0.12)] transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-[0_6px_24px_rgba(80,120,255,0.22)] z-[1]"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrendingMovies;
