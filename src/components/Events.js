import React from "react";
import Event from "./Event";

export default function Events(props) {
  return (
    <div>
      {props.events.map((event, index) => (
        <Event
          passed={event.passed}
          key={index}
          title={event.title}
          description={event.description}
          category={event.category}
          date={event.date}
        />
      ))}
    </div>
  );
}
