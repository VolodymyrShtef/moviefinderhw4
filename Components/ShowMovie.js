import React, { Component, lazy, Suspense } from "react";
import { Route, NavLink } from "react-router-dom";
import Reviews from "./Reviews";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import fetchAPI from "../Utils/fetchAPI";

const AsyncCast = lazy(() => import("./Cast" /* webpackChunkName: "cast" */));

export default class ShowMovie extends Component {
  state = {
    movie: null,
  };

  componentDidMount() {
    fetchAPI(`movie/${this.props.match.params.movieID}`).then((APIanswer) =>
      this.setState({ movie: APIanswer })
    );
  }

  handleClick = () => {
    if (this.props.location.state && this.props.location.state.from) {
      this.props.history.push(this.props.location.state.from);
      return;
    }
    this.props.history.push("/movies");
  };

  render() {
    const { movie } = this.state;
    return (
      movie !== null && (
        <>
          <Button
            variant="outline-primary"
            className="the-button"
            size="sm"
            onClick={this.handleClick}
          >
            Go back
          </Button>

          <Container fluid className="flex_wrapper">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.original_title}
            />
            <Container>
              <h1>{movie.original_title}</h1>
              <br />
              <h2>The story is about:</h2>
              <p>{movie.overview}</p>
              <br />
              <h4>Release:</h4>
              <h4>{movie.release_date}</h4>
              <br />
              <h4>Genres:</h4>
              <h6>{movie.genres.map((item) => item.name + " ")}</h6>
            </Container>
          </Container>
          <hr />

          <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link
                as={NavLink} //так елемент бутстрапа стає потрібним мені навлінком
                to={{
                  pathname: `${this.props.match.url}/cast`,
                  // для вбудованої навігації використовується match.url
                  state: this.props.location.state,
                  // у стейт пхаю поточний стейт цілком, щоб кнопка go back вертала
                  // на сторінку пошуку фільмів із любої конфігурації поточної сторінки
                }}
                className="link"
                activeClassName="active-link"
              >
                Cast
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={NavLink}
                to={{
                  pathname: `${this.props.match.url}/rewiews`,
                  state: this.props.location.state,
                }}
                className="link"
                activeClassName="active-link"
              >
                Reviews
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <br />
          <Suspense fallback={<h1>Wait for a second, please..</h1>}>
            <Route
              path={`${this.props.match.path}/cast`}
              // для вбудованих раутів, тобто коли компонент рендериться по рауту
              // на вже відкритій сторінці, використовується шаблон match.path
              exact
              component={AsyncCast}
            />
            <Route
              path={`${this.props.match.path}/rewiews`}
              exact
              component={Reviews}
            />
          </Suspense>
        </>
      )
    );
  }
}
