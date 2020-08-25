import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  //in hooks first value is the current state second is function to reset it
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //destructuring for state values
  const { email, password } = formData;

  //use spread operator because setFormData overrides entire formdata state
  //uses [e.target.name] so that we can use one onchange for any input field
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("SUCESS");
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Login to your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Need to create an Account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
