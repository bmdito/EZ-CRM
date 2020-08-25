import React, { Fragment, useState } from "react";
//we will use redux instead of axios
// import axios from "axios";

export const Register = () => {
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
      console.log("passwords do not match");
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
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </Fragment>
  );
};

export default Register;
