import React from "react";
import { Card } from "../StyledComponents";
import "./Event.scss";

export default function Event(props) {
  return (
    <Card className={props.passed ? `passed card-wrap` : "card-wrap"}>
      <div className="title-date">
        <h4>
          {props.title} - {props.passed} -{" "}
          <span>
            {props.category}{" "}
            <span className="passed-info">
              {props.passed ? "( passed )" : ""}
            </span>
          </span>
        </h4>
        <p>{props.date.toISOString().slice(0, 10)}</p>
      </div>
      <p className="description">{props.description}</p>
    </Card>
  );
}
