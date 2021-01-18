import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class SearchForm extends Component {
  state = {
    query: "",
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.query === "") return;
    this.props.onSubmit(this.state.query);
    this.setState({ query: "" });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row className="align-items-center">
          <Col xs="auto">
            <Form.Control
              className="mb-2"
              onChange={this.handleChange}
              value={this.state.query}
              placeholder="Input search query"
            />
          </Col>

          <Col xs="auto">
            <Button type="submit" className="mb-2">
              Search
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}
