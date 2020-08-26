import React, { Fragment, useState } from "react";

//we can use connect from react-redux package to connect our alerts to this component:
import { connect } from "react-redux";
// we use connect at the bottom when exporting the component SEE BELOW!

import { setAlert } from "../../actions/alert";
//whenever you bring in an alert from actions and want to use it you need to pass it into the connect method at bottom of page

//any time we use props we need to import proptypes
// we add register proptypes to very bottom above export
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

//we will use redux instead of axios
// import axios from "axios";

export const Register = (props) => {
  //in hooks first value is the current state second is function to reset it
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  //destructuring for state values
  const { name, email, password, password2 } = formData;

  //use spread operator because setFormData overrides entire formdata state
  //uses [e.target.name] so that we can use one onchange for any input field
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      //will will pass the following message and alert type to our actions then dispatch the alert with the randomly created id from uuid
      // alert type "danger" is for styling
      props.setAlert("passwords do not match", "danger");
    } else {
      // console.log(formData);
      console.log("success");
      // below is how you would register the user without redux
      // const newUser = {
      //   name,
      //   email,
      //   password,
      // };
      // try {
      //   //since sending data need config
      //   const config = {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   };
      //   //create the body
      //   const body = JSON.stringify(newUser);

      //   // create res and pass in route, body, and config
      //   const res = await axios.post("/api/users", body, config);
      //   console.log(res.data);
      // } catch (err) {
      //   console.error(err.response.data);
      // }
    }
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

// we use react-redux's "connect" method for anytime we want to connect a component to our redux alerts
export default connect(null, { setAlert })(Register);
//connect takes in two things, first any state we want to map, second is object with any actions we want to use. this allows us to access props.setAlert
