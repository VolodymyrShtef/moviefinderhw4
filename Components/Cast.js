import React, { Component } from "react";
import fetchAPI from "../Utils/fetchAPI";

export default class Cast extends Component {
  state = {
    cast: null,
  };
  componentDidMount() {
    fetchAPI(
      `movie/${this.props.match.params.movieID}/credits`,
      `&language=en-US`
    ).then((APIanswer) => this.setState({ cast: APIanswer.cast }));
  }
  render() {
    return (
      this.state.cast !== null && (
        <>
          <ul>
            {this.state.cast
              .filter((item) => item.profile_path !== null)
              .map((item) => {
                return (
                  <li key={item.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${item.profile_path}`}
                      alt={item.name}
                    />
                    <h6>{item.name}</h6>
                  </li>
                );
              })}
          </ul>
        </>
      )
    );
  }
}
