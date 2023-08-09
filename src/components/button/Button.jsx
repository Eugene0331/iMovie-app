import React from "react";
import "./button.scss";

const Button = (props) => {
  const className = `btn ${props.className}`;
  const onClick = props.onClick ? () => props.onClick() : null;
  return (
    <button className={className} onClick={onClick}>
      {props.children}
    </button>
  );
};

export const OutlineButton = (props) => {
  const className = `btn-outline ${props.className}`;
  const onClick = props.onClick ? () => props.onClick() : null;
  return (
    <Button className={className} onClick={onClick}>
      {props.children}
    </Button>
  );
};

export default Button;
