import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// we destructure by replacing (props) with ({alerts}) so we can use alerts rather than props.alerts
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

//we want to bring redux state to a prop to use in the component
const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
