import React, { Component } from "react";
import { createUser } from "../store/allUsersStore";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { buttons, formInput, formLabel, formLastDiv, forms, formSubDiv, formTitle, maindiv1, maindiv2 } from "../styleClassNames";


class Registration extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      email: "",
      dateOfBirth: "",
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
      email: "",
      dateOfBirth: "",
    })
  }

  render() {
    const { name, password, email, dateOfBirth } = this.state;
    const { handleSubmit } = this;
    const randomX = Math.ceil((Math.random() < 0.5 ? -1 : 1) * (Math.random()*100))
    const randomy = Math.ceil((Math.random() < 0.5 ? -1 : 1) * (Math.random()*100))
    const randomDelay = Math.floor(Math.random()*1.5)
    return (
      <div className='h-screen'>
      <motion.div
        initial={{
          opacity: 0,
          x:`${randomX}`,
          y:`${randomy}`,
          scale: 0
        }}
        whileInView={{
          opacity: 1,
          x:0,
          y:0,
          scale: 1
        }}
        transition={{
          delay: randomDelay
        }}
       className={maindiv1}>
        <div className={maindiv2}>
          <div>
            <div className={formTitle}> Register User</div>
          </div>
            <form className={forms} id="addUser-form" onSubmit={handleSubmit}>
              <div className={formSubDiv}>
                <label className={formLabel} htmlFor="name">Name:</label>
                <input className={formInput} name="name" type="text" value={name} onChange={this.handleChange} />
              </div>
              <div className={formSubDiv}>
                <label className={formLabel} htmlFor="password">Password:</label>
                <input className={formInput}  name="password" type="password"value={password} onChange={this.handleChange} />
              </div>
              <div className={formSubDiv}>
                <label className={formLabel} htmlFor="email">Email:</label>
                <input className={formInput} name="email" type="email" value={email} onChange={this.handleChange} />
              </div>
              <div className={formSubDiv}>
                <label className={formLabel} htmlFor="dateOfBirth">Date of Birth:</label>
                <input className={formInput} name="dateOfBirth" type="date" value={dateOfBirth} onChange={this.handleChange} />
              </div>
              <div className={formLastDiv}>
                <button className={buttons} type="submit">Submit</button>
                <Link className={buttons} to="/">Cancel</Link>
              </div>
            
          </form>
        </div>
      </motion.div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch, { history }) => ({
  createUser: (user) => dispatch(createUser(user, history)),
});

export default connect(null, mapDispatchToProps)(Registration);
