
const Card = ({
  Movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.png"
        }
        alt={"poster"}
      />
      <div className="text-white">
        <h3 className="mt-4">{title}</h3>
        <div className="content">
          <div className="rating">
            
            <img src="star.svg" alt="star icon" />
            <p className="text-white">{vote_average.toFixed(1)}</p>
            <span>.</span>
            <p className="lang">{original_language}</p>
             <span>.</span>
             <p className="year">
                {release_date.split("-")[0]}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
