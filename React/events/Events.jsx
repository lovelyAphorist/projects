import React, { useEffect, useState } from "react";
import * as eventService from "./eventService";
import EventCards from "./EventCards";
import Modal from "react-modal";
import GoogleMap from "./GoogleMap";
// import { Map, GoogleApiWrapper } from "google-maps-react";
// import GoogleMapReact from "google-map-react";

function Events() {
  const [pageEventData, setPageEventData] = useState({
    eventState: [],
    eventCoponents: [],
  });

  const [pageNewEventData, setPageNewEventData] = useState({
    eventState: [],
    eventCoponents: [],
  });

  const [addEventForm, setAddEventForm] = useState({
    dateStart: "",
    dateEnd: "",

    latitude: 0,
    longitude: 0,
    zipCode: "",
    address: "",

    name: "",
    headline: "",
    description: "",
    summary: "",
    slug: Math.floor(Math.random() * 123468),
    statusId: "Active",
  });

  function onSubmit() {
    // const data = { ...addFriendForm };
    const data = {
      metaData: {
        dateStart: addEventForm.dateStart,
        dateEnd: addEventForm.dateEnd,
        location: {
          latitude: addEventForm.latitude,
          longitude: addEventForm.longitude,
          zipCode: addEventForm.zipCode,
          address: addEventForm.address,
        },
      },
      name: addEventForm.name,
      headline: addEventForm.headline,
      description: addEventForm.description,
      summary: addEventForm.summary,
      slug: Math.floor(Math.random() * 123468),
      statusId: "Active",
    };
    console.log(data);

    eventService.addEvent(data).then(onAddEventSuccess).catch(onAddEventError);
  }

  const onAddEventSuccess = (response) => {
    console.log(response);
  };

  const onAddEventError = (response) => {
    console.log(response);
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  // setAddEventForm

  const onFormFieldChange = (e) => {
    const target = e.target;
    let newUserValue = target.value;
    const nameOfField = target.name;

    if (nameOfField === "dateStart" || nameOfField === "dateEnd") {
      //
      console.log("val", newUserValue);
    }

    setAddEventForm((prevState) => {
      var metaData = { ...prevState.metaData };
      const newUserObject = {
        ...prevState,
        metaData,
      };

      newUserObject[nameOfField] = newUserValue;
      console.log(newUserObject);
      return newUserObject;
    });
  };
  Modal.setAppElement("#root");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    console.log("fetching events");
    eventService
      .retreiveEvents()
      .then(onRetreiveEventsSuccess)
      .catch(onRetreiveEventsFail);

    eventService
      .newestEvent()
      .then(onNewestEventSuccess)
      .catch(onNewestEventFail);
  }, []);

  // componentDidMount = () => {
  //     eventService
  //       .newestEvent()
  //       .then(onNewestEventSuccess)
  //       .catch(onNewestEventFail);
  //   };

  const onRetreiveEventsSuccess = (response) => {
    let arrayOfEvents = response.data.item.pagedItems;

    setPageEventData((prevState) => {
      const pFD = { ...prevState };
      pFD.eventState = arrayOfEvents;
      pFD.eventCoponents = arrayOfEvents.map(mapEvents);
      return pFD;
    });
  };
  // let lat = 0;
  // let lng = 0;
  const onNewestEventSuccess = (response) => {
    let arrayOfEvents = response.data.item.pagedItems;
    console.log(response);
    // const longitude = arrayOfEvents.metaData.location.longitude;
    // const latitude = arrayOfEvents.metaData.location.latitude;
    // lat.push(latitude);
    // lng.push(longitude);
    // setHasData((prevState)=>{
    //   !prevSTat
    // })
    setPageNewEventData((prevState) => {
      const pFD = { ...prevState };
      pFD.eventState = arrayOfEvents[0];
      console.log("eventState:", pFD.eventState);
      pFD.eventCoponents = arrayOfEvents.map(mapEvents);
      return pFD;
    });
  };

  const mapEvents = (aEvent) => {
    console.log("mapping starting up");
    return <EventCards event={aEvent} key={"GroupA-" + aEvent.id} />;
  };

  const onRetreiveEventsFail = (response) => {
    console.log(response);
  };

  const onNewestEventFail = (response) => {
    console.log(response);
  };

  // if (pageNewEventData.eventState && pageNewEventData.eventState.metaData) {
  //   latitude = pageNewEventData.eventState.metaData.location.latitude;
  //   longitude = pageNewEventData.eventState.metaData.location.longitude;
  // }
  // let myLat = GoogleMap.getCenter().lat();
  // console.log(myLat);
  return (
    <React.Fragment>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="row justify-content-center my-5">
          <div className="col-lg-6">
            <form id="event">
              <label htmlFor="name" className="form-label">
                name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={addEventForm.name}
                onChange={onFormFieldChange}
                required
              />

              <label htmlFor="headline" className="form-label">
                headline:
              </label>
              <input
                type="text"
                id="headline"
                name="headline"
                className="form-control"
                value={addEventForm.headline}
                onChange={onFormFieldChange}
                required
              />

              <label htmlFor="description" className="form-label">
                description:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="form-control"
                value={addEventForm.description}
                onChange={onFormFieldChange}
                required
              />

              <label htmlFor="summary" className="form-label">
                Summary:
              </label>
              <input
                type="text"
                id="summary"
                name="summary"
                className="form-control"
                value={addEventForm.summary}
                onChange={onFormFieldChange}
                required
              />

              <label htmlFor="dateStart" className="form-label">
                Date Start:
              </label>
              <input
                type="text"
                id="dateStart"
                name="dateStart"
                className="form-control"
                placeholder="YYYY-MM-DD"
                value={addEventForm.dateStart}
                onChange={onFormFieldChange}
                required
              />
              <label htmlFor="dateEnd" className="form-label">
                Date End:
              </label>
              <input
                type="text"
                id="dateEnd"
                name="dateEnd"
                className="form-control"
                placeholder="YYYY-MM-DD"
                value={addEventForm.dateEnd}
                onChange={onFormFieldChange}
                required
              />

              <label htmlFor="longitude" className="form-label">
                longitude:
              </label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                className="form-control"
                value={addEventForm.longitude}
                onChange={onFormFieldChange}
                required
              />

              <label htmlFor="latitude" className="form-label">
                latitude:
              </label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                className="form-control"
                value={addEventForm.latitude}
                onChange={onFormFieldChange}
                required
              />

              <label htmlFor="zipCode" className="form-label">
                Zip Code:
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                className="form-control"
                value={addEventForm.zipCode}
                onChange={onFormFieldChange}
                required
              />

              <label htmlFor="address" className="form-label">
                address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-control"
                value={addEventForm.address}
                onChange={onFormFieldChange}
                required
              />
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary edit-me"
              onClick={closeModal}
            >
              close
            </button>
            <button
              type="button"
              className="btn btn-info submit-form"
              onClick={onSubmit}
            >
              Sumbit
            </button>
          </div>
        </div>
      </Modal>

      <h1>Events</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-7 right">
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary modal-opener"
                onClick={openModal}
              >
                Create a new Event!
              </button>
            </div>
            {pageNewEventData.eventCoponents}

            {pageNewEventData.eventState &&
            pageNewEventData.eventState.metaData ? (
              <GoogleMap
                lat={pageNewEventData.eventState.metaData.location.latitude}
                lng={pageNewEventData.eventState.metaData.location.longitude}
              />
            ) : (
              <div></div>
            )}
          </div>
          <div className="col-lg-5 left">{pageEventData.eventCoponents}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Events;
