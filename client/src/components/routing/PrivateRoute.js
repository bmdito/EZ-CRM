import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//do some destructuring with props below
//use rest operator to get any other components that are passed in
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  // anything that passed in ..rest above will be passed below
  // we use a Route just like app.js, but adding in a render prop that checks to see if !authenticated and !loading and if they are redirect to login
  //if they are authenticated the component loads
  <Route
    {...rest}
    render={(props) =>
      !auth.isAuthenticated && !auth.loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  //pulls in state in auth reducer
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
