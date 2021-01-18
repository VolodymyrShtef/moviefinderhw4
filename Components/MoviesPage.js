import React, { Component } from "react";
import SearchForm from "./SearchForm";
import MoviesList from "./MoviesList";
import queryString from "query-string";
import fetchAPI from "../Utils/fetchAPI";

export default class MoviesPage extends Component {
  state = {
    moviesList: [],
  };
  componentDidMount() {
    const { search } = this.props.location;
    if (search) {
      const searchParams = queryString.parse(search);
      fetchAPI(
        "search/movie",
        `&language=en-US&query=${searchParams.query}`
      ).then((APIanswer) => this.setState({ moviesList: APIanswer.results }));
    }
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props.location;
    const prevSearchParams = queryString.parse(prevProps.location.search);
    const searchParams = queryString.parse(search);

    if (
      prevSearchParams.query !== searchParams.query &&
      searchParams.query !== undefined
    ) {
      fetchAPI(
        "search/movie",
        `&language=en-US&query=${searchParams.query}`
      ).then((APIanswer) => {
        if (APIanswer.results.length === 0) {
          alert("Nothing found");
          return;
        }
        this.setState({ moviesList: APIanswer.results });
      });
    }
  }

  handleSubmit = (query) => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${query}`,
    });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {this.state.moviesList.length !== 0 && this.props.location.search && (
          <MoviesList
            currentList={"Результати пошуку"}
            moviesList={this.state.moviesList}
            location={this.props.location}
          />
        )}
      </>
    );
  }
}
