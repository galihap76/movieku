import { useState } from "react";
import Navbar from "./components/Navbar";
import { CariMovie, DataMovie } from "./components/Movie";
import Footer from "./components/Footer";

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const handleSearch = (input) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        let resData = data.results;
        setSearchResult(resData);

        resData.forEach((item) => {
          fetch(
            `https://api.themoviedb.org/3/movie/${item.id}?language=en-US`,
            options
          )
            .then((res2) => res2.json())
            .then((data2) => {
              setMovieDetails((prevDetails) => ({
                ...prevDetails,
                [item.id]: data2,
              }));
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container mt-3 flex-grow-1">
          <CariMovie onSearch={handleSearch} />
          <DataMovie data={searchResult} data2={movieDetails} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
