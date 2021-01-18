import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar.js";
import "./styles.css";
import { lazy, Suspense } from "react";

// реалізація code splitting + Suspense на раутах
const AsyncTrendMovies = lazy(() =>
  import("./Components/TrendMovies.js" /* webpackChunkName: "trend-movies" */)
);
const AsyncShowMovie = lazy(() =>
  import("./Components/ShowMovie.js" /* webpackChunkName: "one-movie-page" */)
);
const AsyncMoviesPage = lazy(() =>
  import("./Components/MoviesPage.js" /* webpackChunkName: "search-movie" */)
);

class App extends Component {
  state = {
    moviesList: [],
  };

  render() {
    return (
      <>
        <Navbar />
        <Suspense fallback={<h1>Wait for a second, please..</h1>}>
          <Switch>
            <Route path="/" exact component={AsyncTrendMovies} />
            <Route path="/movies/:movieID" component={AsyncShowMovie} />
            <Route path="/movies" component={AsyncMoviesPage} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default App;
