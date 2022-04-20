import React, { Component } from "react";
import { createUser } from "../store/users";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


class Registration extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      email: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createUser({ ...this.state });
    this.setState({
      name: "",
      password: "",
      email: ""
    })
  }

  render() {
    const { name, password, email } = this.state;
    const { handleSubmit } = this;

    return (

      <div className="addUser">
      <span>
      <div className="actionHeader"> Register User</div>
      </span>
      <form id="addUser-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input name="name" value={name} onChange={this.handleChange} />

        <label htmlFor="password">Password:</label>
        <input name="password" value={password} onChange={this.handleChange} />

        <label htmlFor="email">Email:</label>
        <input name="email" value={email} onChange={this.handleChange} />

        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
      </form>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch, { history }) => ({
  createUser: (user) => dispatch(createUser(user, history)),
});

export default connect(null, mapDispatchToProps)(Registration);
