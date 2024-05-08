import React from "react";
import PropTypes from "prop-types";
import "../../styles/Cadre.scss";

function Cadre({ children }) {
  return (
    <div className="cadre-container">
      <div className="cadre-content">{children}</div>
    </div>
  );
}

Cadre.propTypes = {
  children: PropTypes.node,
};

Cadre.defaultProps = {
  children: null,
};

export default Cadre;
