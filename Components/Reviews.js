import React, { Component } from "react";
import fetchAPI from "../Utils/fetchAPI";

export default class Reviews extends Component {
  state = {
    reviews: null,
  };

  componentDidMount() {
    fetchAPI(
      `movie/${this.props.match.params.movieID}/reviews`,
      `&language=en-US`
    ).then((APIanswer) => this.setState({ reviews: APIanswer.results }));
  }

  render() {
    return (
      this.state.reviews !== null && (
        <ul>
          {this.state.reviews.map((item) => (
            <li key={item.id}>
              <h4>{item.author}</h4>
              <h6>{item.content}</h6>
            </li>
          ))}
        </ul>
      )
    );
  }
}
