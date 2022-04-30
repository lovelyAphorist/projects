import React from "react";
import Modal from "react-modal";

function EventCards(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const aEvent = props.event;

  let changeStart = aEvent.metaData.dateStart.split("T");
  let changeDateStart = changeStart[0];

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

  Modal.setAppElement("#root");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>More Info</h2>

        <div>Name: {aEvent.name}</div>
        <div>Description: {aEvent.description}</div>
        <div>Address: {aEvent.metaData.location.address} </div>
        <div>Zip: {aEvent.metaData.location.zipCode}</div>
        <div>Summary: {aEvent.summary}</div>
        <button
          type="button"
          className="btn btn-primary edit-me"
          onClick={closeModal}
        >
          close
        </button>
      </Modal>

      <div className="container bcontent">
        <h2>{aEvent.name}</h2>
        {/* <hr /> */}
        <div className="card" style={{ width: "500px" }}>
          <div className="row no-gutters">
            <div className="col-sm-5">
              {/* <h2>{aEvent.name}</h2> */}
              <img
                className="card-img"
                src="https://image.shutterstock.com/image-vector/events-colorful-typography-banner-260nw-1356206768.jpg"
                alt="Event Words"
              />
            </div>
            <div className="col-sm-7">
              <div className="card-body">
                <h5 className="card-title">{aEvent.headline}</h5>
                <p className="card-text">{aEvent.summary}</p>
                <p className="card-text date">{changeDateStart}</p>
                <button
                  type="button"
                  className="btn btn-primary edit-me"
                  onClick={openModal}
                >
                  More Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(EventCards);
