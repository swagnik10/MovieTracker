import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorite() {
  const { favorites } = useMovieContext();
  if(favorites && favorites.length > 0){
    return (
      <div className="movies-grid">
        {favorites.map(
          (movie) =>
            /*movie.title.toLowerCase().startsWith(searchQuery) && (
              <MovieCard key={movie.id} movie={movie} />
            )*/
           <MovieCard key={movie.id} movie={movie} />
        )}
      </div>
    );
  }


  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>This page will display the user's favorite movies.</p>
    </div>
  );
}

export default Favorite;