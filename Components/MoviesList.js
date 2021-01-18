import React from "react";
import { Link } from "react-router-dom";

export default function MoviesList({ currentList, moviesList, location }) {
  return (
    <>
      <h1>{currentList}</h1>
      <ul>
        {/* формую розмітку jsx через map прямо тут в return */}
        {moviesList.map((movie) => (
          <li key={movie.id}>
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location }, //тут у стейт треба весь локейшн запхати, щоб там і search був
              }}
            >
              {movie.original_title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
