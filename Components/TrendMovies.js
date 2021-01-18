import React, { Component } from "react";
import fetchAPI from "../Utils/fetchAPI";
import MoviesList from "./MoviesList";

export default class TrendMovies extends Component {
  state = {
    moviesList: [],
  };
  componentDidMount() {
    fetchAPI("trending/movie/day").then((APIanswer) =>
      this.setState({ moviesList: APIanswer.results })
    );
    // було так, поки не виніс у окрему утиліту
    // fetch(
    //   "https://api.themoviedb.org/3/trending/movie/day?api_key=d8156ffe5031a29b90b514e3d70f6ab1"
    // )
    //   .then((response) => response.json())
    //   .then((APIanswer) => this.setState({ moviesList: APIanswer.results }))
    //   .catch((error) => alert(error.message));
  }
  render() {
    return (
      this.state.moviesList.length !== 0 && (
        <MoviesList
          currentList={"Популярні фільми"}
          moviesList={this.state.moviesList}
          location={this.props.location}
        />
      )
    );
  }
}
