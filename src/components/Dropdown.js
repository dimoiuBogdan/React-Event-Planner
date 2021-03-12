import React from "react";
import "./Dropdown.scss";
export default function Dropdown(props) {
  const chooseCategory = (e) => {
    props.setCategory(e.target.innerHTML);
    props.toggleShowDropdown(!props.showDropdown);
  };

  return (
    <div className="dropdown">
      <h3 onClick={chooseCategory}>Very Important</h3>
      <h3 onClick={chooseCategory}>Important</h3>
      <h3 onClick={chooseCategory}>Not So Important</h3>
    </div>
  );
}
