import { useRef } from "react";
import PropTypes from "prop-types";

function AnimatedText({ text, className, id }) {
  const textRef = useRef(null);

  return (
    <h2 className={className} id={id} ref={textRef}>
      {text.split("").map((char) => (
        <span key={char}>{char}</span>
      ))}
    </h2>
  );
}

AnimatedText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
};

AnimatedText.defaultProps = {
  className: "",
  id: "",
};

export default AnimatedText;
