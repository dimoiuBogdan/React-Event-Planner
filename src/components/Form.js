import React, { useState } from "react";
import { Container } from "../StyledComponents";
import Dropdown from "./Dropdown";
import "./Form.scss";

export default function Input(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [titleErrorDisplay, setTitleErrorDisplay] = useState(false);
  const [descriptionErrorDisplay, setDescriptionErrorDisplay] = useState(false);
  const [categoryErrorDisplay, setCategoryErrorDisplay] = useState(false);
  const [dateErrorDisplay, setDateErrorDisplay] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const addEvent = () => {
    if (title && description && category && day && month && year) {
      let presentTime = new Date();
      let passed = false;
      let eventTime = new Date(`${+month}"/"${+day + 1}"/"${+year}`);
      let daysDiff = Math.ceil((eventTime - presentTime) / (1000 * 3600 * 24));
      if (daysDiff < 0) passed = true;
      props.setEvents([
        ...props.events,
        {
          title: title,
          description: description,
          category: category,
          date: new Date(`${+month}"/"${+day + 1}"/"${+year}`),
          passed: passed,
        },
      ]);

      hideForm();
    } else {
      if (!title) setTitleErrorDisplay(true);
      if (!description) setDescriptionErrorDisplay(true);
      if (!category) setCategoryErrorDisplay(true);
      if (!day || !month || !year) setDateErrorDisplay(true);
    }
  };

  const hideForm = () => {
    props.setShowForm(false);
  };

  const defineTitle = (e) => {
    setTitle(e.target.value);
    if (titleErrorDisplay) setTitleErrorDisplay(false);
  };
  const defineDescription = (e) => {
    setDescription(e.target.value);
    if (descriptionErrorDisplay) setDescriptionErrorDisplay(false);
  };
  const defineDay = (e) => {
    setDay(e.target.value);
    if (dateErrorDisplay) setDateErrorDisplay(false);
  };
  const defineMonth = (e) => {
    setMonth(e.target.value);
    if (dateErrorDisplay) setDateErrorDisplay(false);
  };
  const defineYear = (e) => {
    setYear(e.target.value);
    if (dateErrorDisplay) setDateErrorDisplay(false);
  };

  const toggleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Container inForm className="container">
      <h2 className="container-title">New Event</h2>
      <div className="input-container title">
        <label>Title</label>
        <input type="text" onChange={defineTitle} />
        {titleErrorDisplay ? (
          <p className="error">You must enter a valid title!</p>
        ) : null}
      </div>
      <div className="input-container description">
        <label>Description</label>
        <textarea type="text" onChange={defineDescription} />
        {descriptionErrorDisplay ? (
          <p className="error">You must enter a valid description!</p>
        ) : null}
      </div>
      <div className="input-container category">
        <label>Importance</label>
        <div className="input">
          <input
            type="text"
            readOnly
            value={category}
            onClick={toggleShowDropdown}
            className={showDropdown ? "dropdownOn" : ""}
          />
          {showDropdown ? (
            <Dropdown
              className="dropdown"
              showDropdown={showDropdown}
              toggleShowDropdown={toggleShowDropdown}
              setCategory={setCategory}
            />
          ) : null}
        </div>
        {categoryErrorDisplay ? (
          <p className="error">You must enter a valid importance!</p>
        ) : null}
      </div>
      <div className="input-container date">
        <div className="dates">
          <div className="date-input day">
            <label>Day</label>
            <input type="number" min="1" max="31" onChange={defineDay} />
          </div>
          <div className="date-input month">
            <label>Month</label>
            <input type="number" min="1" max="12" onChange={defineMonth} />
          </div>
          <div className="date-input year">
            <label>Year</label>
            <input type="number" min="1" onChange={defineYear} />
          </div>
        </div>
        {dateErrorDisplay ? (
          <p className="error">You must enter a valid date!</p>
        ) : null}
      </div>
      <button className="add" onClick={addEvent}>
        Add
      </button>
      <button className="cancel" onClick={hideForm}>
        Cancel
      </button>
    </Container>
  );
}
