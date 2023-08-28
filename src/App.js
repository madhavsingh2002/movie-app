import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [searchMovie,setSearchMovie]=useState('')
  const [movieDetail, setMovieDetail] = useState({
    Title: "",
    imdbRating: "",
    Rated: "",
    Year: "",
    Runtime: "",
    Actors: "",
    Plot: "",
    Poster: "",
    Genre: "",
  });
  const getMovie = async (searchMovie) => {
    const url = `http://www.omdbapi.com/?t=${searchMovie}&apikey=86b435f4`;    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("error fetching");
      }
      const data = await response.json();
      setMovieDetail(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (searchMovie) {
      getMovie(searchMovie);
    }
  }, [searchMovie]);
  return (
    <>
      <h1 className="text-center mt-3">🍿Movie-App guide🎬</h1>
      <div className="movie-body">
        <div className="input-group  ">
          <input
            type="text"
            className="form-control p-2"
            placeholder="Search your Movie"
            value={searchMovie}
            onChange={(e)=>setSearchMovie(e.target.value)}
          />
          <button
            className="btn btn-danger ms-2"
            type="submit"
            id="button-addon2"
            style={{ padding: "5px 22px" }}
          >
            search
          </button>
        </div>
        <div className="movie-content d-flex flex-column justify-content-between">
          <div className="info d-flex">
            <img src={movieDetail.Poster} className="poster mt-2" />
            <div className="info-content">
              <h2>{movieDetail.Title}</h2>
              <div className="rating mb-3">
                <h5>
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#e73c37" }}
                  >
                    grade
                  </span>
                  {movieDetail.imdbRating}
                </h5>
              </div>
              <div className="details mb-3">
                <span className="ms-3">{movieDetail.Rated}</span>
                <span className="ms-3">{movieDetail.Year}</span>
                <span className="ms-3">{movieDetail.Runtime}</span>
              </div>
              <div className="genre mb-3 d-flex gap-3 justify-content-center">
                {movieDetail.Genre.split(",").map((genre) => (
                  <div key={genre}>{genre}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="plot mt-2" style={{ color: "white" }}>
            <h4>Plot:</h4>
            <p>{movieDetail.Plot}</p>
          </div>
          <div className="mt-2" style={{ color: "white" }}>
            <h4>Cast:</h4>
            <p>{movieDetail.Actors}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
