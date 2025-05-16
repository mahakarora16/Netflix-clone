import React, { useState } from "react";
import { categories, sampleMovies } from "./moviesData";
import { NavBar } from "./NavBar";

function HeroBanner({ movie }) {
  return (
    <div className="relative w-full h-[350px] md:h-[500px] bg-black text-white mb-8 overflow-hidden rounded-xl shadow-lg">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 flex flex-col justify-center p-8 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.title}</h1>
        <p className="max-w-lg text-sm md:text-base">{movie.overview}</p>
      </div>
    </div>
  );
}

function MovieRow({ title, movies, onSelect }) {
  const [failedImages, setFailedImages] = React.useState({});
  const handleImgError = (e, id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };
  return (
    <div className="mb-6">
      <h2 className="text-white text-xl font-semibold px-4 mb-2">{title}</h2>
      <div className="flex overflow-x-auto gap-4 px-4 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-zinc-800 hover:scrollbar-thumb-red-500">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative group min-w-[150px] w-[150px] h-[220px] rounded-lg overflow-hidden bg-zinc-800 cursor-pointer hover:scale-105 transition-transform duration-200 shadow-md"
            onClick={() => onSelect(movie)}
          >
            {(!movie.image || failedImages[movie.id]) ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-700 text-white opacity-80 text-sm font-semibold">
                No Image
              </div>
            ) : (
              <img
                src={movie.image}
                alt={movie.title}
                className="object-cover w-full h-full"
                onError={(e) => handleImgError(e, movie.id)}
              />
            )}

            {/* Hover Overlay Title */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center p-2">
              <p className="text-white text-sm font-semibold text-center">{movie.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieModal({ movie, onClose }) {
  if (!movie) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      <div className="bg-zinc-900 max-w-lg w-full rounded-lg shadow-xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl">&times;</button>
        {movie.image ? (
          <img src={movie.image} alt={movie.title} className="rounded mb-5 max-h-48 object-cover mx-auto" />
        ) : (
          <div className="rounded mb-5 max-h-48 w-full p-12 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-700 text-white opacity-80 text-lg font-semibold">No Image Available</div>
        )}
        <h2 className="text-2xl font-bold text-white mb-3">{movie.title}</h2>
        <p className="text-zinc-300 text-base mb-3">{movie.overview}</p>
        {movie.category && (
          <div className="text-sm text-zinc-400 mb-3">Category: {movie.category}</div>
        )}
        <div className="flex justify-end">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium">Play</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const pickRandomMovie = () => sampleMovies[Math.floor(Math.random() * sampleMovies.length)];

  return (
    <div className="bg-zinc-950 min-h-screen">
      <NavBar />
      <div className="max-w-6xl mx-auto py-6 px-2 md:px-0">
        <HeroBanner movie={pickRandomMovie()} />
        {categories.map((category) => (
          <MovieRow
            key={category}
            title={category}
            movies={sampleMovies.filter((m) => m.category === category && m.image)}
            onSelect={setSelectedMovie}
          />
        ))}
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      </div>
    </div>
  );
}

export default App;

