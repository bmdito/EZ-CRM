import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
// import auth from "../../reducers/auth";

const Dashboard = ({ getCurrentProfile, auth, profile }) => {
  //we want to getCurrentProfile as soon as it loads. because using hoooks we use useEffect() rather than componentDidMount
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
