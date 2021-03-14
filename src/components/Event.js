import React from "react";
import { Card } from "../StyledComponents";
import "./Event.scss";

export default function Event(props) {
  const deleteEvent = () => {
    props.setEvents(
      props.events.filter(
        (clickedElement) => clickedElement.title !== props.event.title
      )
    );
  };

  return (
    <div>
      <Card className={props.passed ? `passed card-wrap` : "card-wrap"}>
        <div className="title-date">
          <h4>
            {props.title} -{" "}
            <span>
              {props.category}{" "}
              <span className="passed-info">
                {props.passed ? "( passed )" : ""}
              </span>
            </span>
          </h4>
          <p>{props.date.toString().slice(0, 10)}</p>
        </div>
        <p className="description">{props.description}</p>
        <div className="edit-section">
          <i className="fas fa-trash" onClick={deleteEvent}></i>
        </div>
      </Card>
    </div>
  );
}
