import React from "react";
import { func, string } from "prop-types";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

const Error = ({ img, title, action }) => {
  const history = useHistory();
  const checkIfHasActionProp = () => !!action && action();

  const onClick = () => {
    checkIfHasActionProp();
    history.push("/");
  };

  return (
    <div className="error-wrapper">
      <img alt="error-img" src={img} />
      <h1 className="error-title">{title}</h1>
      <Button variant="outlined" onClick={onClick}>
        Go To Home
      </Button>
    </div>
  );
};

Error.propTypes = {
  img: string.isRequired,
  title: string.isRequired,
  action: func,
};

Error.defaultProps = { func: () => {} };

export default Error;