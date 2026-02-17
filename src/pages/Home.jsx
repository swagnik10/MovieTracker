import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import {getPopularMovies, searchMovies} from "../services/api";

function Home() {
//   const movies = [
//     { id: 1, title: "Inception", year: 2010 },
//     { id: 2, title: "The Matrix", year: 1999 },
//     { id: 3, title: "Interstellar", year: 2014 },
//   ];

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setLoading(false);
        };
        fetchMovies();
    }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    //alert("you searched for: " + searchQuery);
    if(!searchQuery.trim()) 
        return;
    if(loading) return;

    setLoading(true);
    try{
        const searchResult =  await searchMovies(searchQuery);
        console.log("Search result count:", searchResult.length);
        {searchResult.length === 0 && <h2>No movies found</h2>;}
        setMovies(searchResult);
        setLoading(false);
        setError(null);
    }
    catch(error){
        console.error("Error searching movies:", error);
        setError("Failed to search movies");
        setLoading(false);
    }
    
    
    //setSearchQuery("");
  };

  return (
    <div className="home">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {loading ? (<div className="loading">Loading...</div>) : (
      <div className="movies-grid">
        {movies.map(
          (movie) =>
            /*movie.title.toLowerCase().startsWith(searchQuery) && (
              <MovieCard key={movie.id} movie={movie} />
            )*/
           <MovieCard key={movie.id} movie={movie} />
        )}
      </div>)}
    </div>
  );
}

export default Home;
