import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import Events from "./components/Events";
import Form from "./components/Form";
import { Header, Container } from "./StyledComponents";

export default function App() {
  const [nextDays, setNextDays] = useState(30);
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([
    {
      title: "Passed",
      description: "De porc",
      category: "Important",
      date: new Date("3/3/2021"),
    },
    {
      title: "NP",
      description: "De porc",
      category: "Important",
      date: new Date("3/15/2021"),
    },
    {
      title: "NP",
      description: "De porc",
      category: "Important",
      date: new Date("3/21/2021"),
    },
  ]);
  const [displayedEvents, setDisplayedEvents] = useState([]);
  const [dateSortingMethod, setDateSortingMethod] = useState("descending");
  const [passedSortingMethod, setPassedSortingMethod] = useState(false);
  const [passedEvents, setPassedEvents] = useState([]);

  useEffect(() => {
    filterEventsByDays();
    sortEventsByDate();
  }, [events, nextDays, passedEvents]);

  const changeNextDays = (e) => {
    setNextDays(e.target.value);
  };

  const showFormHandle = () => {
    setShowForm(true);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowForm(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const filterEventsByDays = () => {
    setDisplayedEvents(
      events.forEach((event) => {
        let presentTime = new Date();
        let eventTime = event.date;
        let daysDiff = Math.ceil(
          (eventTime - presentTime) / (1000 * 3600 * 24)
        );
        if (daysDiff < 0 && !passedEvents.includes(event)) {
          setPassedEvents([...passedEvents, event]);
          event.passed = true;
        }
        return event;
      })
    );
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const sortEventsByDate = () => {
    const futureEvents = events.filter((event) => {
      return !event.passed;
    });
    dateSortingMethod === "ascending"
      ? setDateSortingMethod("descending")
      : setDateSortingMethod("ascending");
    dateSortingMethod === "ascending"
      ? futureEvents.sort((a, b) => a.date - b.date)
      : futureEvents.sort((a, b) => b.date - a.date);
    const sortedEvents = futureEvents.concat(passedEvents);
    setDisplayedEvents(sortedEvents);
  };

  const sortEventsByPassed = () => {
    passedSortingMethod
      ? displayedEvents.sort((a, b) => {
          setPassedSortingMethod(!passedSortingMethod);
          return a === b ? 0 : a ? -1 : 1;
        })
      : displayedEvents.sort((a, b) => {
          setPassedSortingMethod(!passedSortingMethod);
          return a === b ? 0 : a ? -1 : -1;
        });
    setDisplayedEvents(displayedEvents);
  };

  return (
    <div className="App">
      <h1>
        Events <i className="fa fa-plus-square" onClick={showFormHandle}></i>
      </h1>
      <Container>
        <div className="details">
          <Header>
            {displayedEvents.length - passedEvents.length} events in the next{" "}
            {nextDays} days <br />
          </Header>
          <div className="right">
            <input
              type="number"
              value={nextDays}
              onChange={changeNextDays}
              min="1"
            />
          </div>
        </div>
        <div className="sorting">
          <h5 onClick={sortEventsByDate}>
            Date{" "}
            {dateSortingMethod === "descending" ? (
              <i className="fas fa-chevron-up"></i>
            ) : (
              <i className="fas fa-chevron-down"></i>
            )}
          </h5>
          <h5>Importance</h5>
          <h5 onClick={sortEventsByPassed}>
            Passed{" "}
            {passedSortingMethod ? (
              <i className="fas fa-chevron-up"></i>
            ) : (
              <i className="fas fa-chevron-down"></i>
            )}
          </h5>
        </div>
        <Events events={displayedEvents} />
      </Container>
      {showForm ? (
        <div className="form">
          <div ref={wrapperRef}>
            <Form
              setEvents={setEvents}
              events={events}
              setShowForm={setShowForm}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
