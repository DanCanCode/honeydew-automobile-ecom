import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { buttons, forms, maindiv2, maindiv1, formSubDiv, formLabel, formInput, formLastDiv, formTitle } from "../styleClassNames";
import { motion } from "framer-motion";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
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
          <div className={formTitle}>Login</div>
        </div>
        <form className={forms} onSubmit={handleSubmit} name={name}>
          <div className={formSubDiv}>
            <label className={formLabel} htmlFor="username">Username</label>
            <input className={formInput} name="username" type="text" />
          </div>
          <div className={formSubDiv}>
            <label className={formLabel} htmlFor="password">Password</label>
            <input className={formInput} name="password" type="password" />
          </div>
          <div className={formLastDiv}>
            <button className={buttons} type="submit">{displayName}</button>
          </div>
          {error && error.response && <div className={formLastDiv}> {error.response.data} </div>}
        </form>
      </div>
    </motion.div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
