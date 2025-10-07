import Loading from "./Loading";
import Card from "./Card";

const MoviesList = ({ movies, isLoading, errorMessage }) => {
  return (
    <section className="px-6 py-10 text-gray-100">
      <h2 className="text-4xl font-bold mb-6 text-center">All Movies</h2>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loading />
        </div>
      ) : errorMessage ? (
        <p className="text-red-500 text-center text-lg">{errorMessage}</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <Card key={movie.id} Movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default MoviesList;
