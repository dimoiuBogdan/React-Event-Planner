import React from "react";
import Event from "./Event";

export default function Events(props) {
  return (
    <div>
      {props.events.map((event, index) => (
        <Event
          passed={event.passed}
          event={event}
          key={index}
          id={index}
          title={event.title}
          description={event.description}
          category={event.category}
          date={event.date}
          events={props.events}
          setEvents={props.setEvents}
        />
      ))}
    </div>
  );
}
