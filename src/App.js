import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import Events from "./components/Events";
import Form from "./components/Form";
import { Container } from "./StyledComponents";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [dateSortingMethod, setDateSortingMethod] = useState("descending");
  const [passedSortingMethod, setPassedSortingMethod] = useState(false);
  const [importanceSortingMethod, setImportanceSortingMethod] = useState();

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

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const sortEventsByDate = () => {
    dateSortingMethod === "ascending"
      ? setDateSortingMethod("descending")
      : setDateSortingMethod("ascending");
    dateSortingMethod === "ascending"
      ? events.sort((a, b) => a.date - b.date)
      : events.sort((a, b) => b.date - a.date);
    setEvents(events);
  };

  const sortEventsByImportance = () => {
    events.forEach((event) => {
      event.category === "Very Important"
        ? (event.categoryGrade = 3)
        : event.category === "Important"
        ? (event.categoryGrade = 2)
        : event.category === "Not So Important"
        ? (event.categoryGrade = 1)
        : (event.categoryGrade = null);
    });
    if (!importanceSortingMethod) setImportanceSortingMethod("descending");
    importanceSortingMethod === "ascending"
      ? events.sort((a, b) => a.categoryGrade - b.categoryGrade)
      : events.sort((a, b) => b.categoryGrade - a.categoryGrade);
    importanceSortingMethod === "ascending"
      ? setImportanceSortingMethod("descending")
      : setImportanceSortingMethod("ascending");
    setEvents(events);
  };

  const sortEventsByPassed = () => {
    if (events.some((event) => event.passed)) {
      passedSortingMethod
        ? events.sort((a, b) => {
            setPassedSortingMethod(!passedSortingMethod);
            return a === b ? 0 : a ? -1 : 1;
          })
        : events.sort((a, b) => {
            setPassedSortingMethod(!passedSortingMethod);
            return a === b ? 0 : a ? -1 : -1;
          });
      setEvents(events);
    }
  };

  return (
    <div className="App">
      <h1>
        Events <i className="fa fa-plus-square" onClick={showFormHandle}></i>
      </h1>
      <Container>
        <div className="sorting">
          <h5 onClick={sortEventsByDate}>
            Date{" "}
            {dateSortingMethod === "descending" ? (
              <i className="fas fa-chevron-up"></i>
            ) : (
              <i className="fas fa-chevron-down"></i>
            )}
          </h5>
          <h5 onClick={sortEventsByImportance}>
            Importance{" "}
            {importanceSortingMethod === "descending" ? (
              <i className="fas fa-chevron-up"></i>
            ) : importanceSortingMethod === "ascending" ? (
              <i className="fas fa-chevron-down"></i>
            ) : null}
          </h5>
          <h5 onClick={sortEventsByPassed}>
            Passed{" "}
            {passedSortingMethod ? (
              <i className="fas fa-chevron-up"></i>
            ) : (
              <i className="fas fa-chevron-down"></i>
            )}
          </h5>
        </div>
        <Events events={events} />
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
