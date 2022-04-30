import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

function JobCards(props) {
  const aJob = props.job;
  const navigate = useNavigate();

  const onEditClick = () => {
    const transporting = { type: "Job", payload: aJob };
    navigate(`new/${aJob.id}`, { state: transporting });
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

  Modal.setAppElement("#root");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = "#f00";
  // }

  let imageTest = aJob.techCompany.images[0];
  //   console.log(imageTest.imageUrl);

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

        <div>Description: {aJob.description}</div>
        <div>Pay: ${aJob.pay}</div>
        <div>Company: {aJob.techCompany.name} </div>
        <div>Company Contact: {aJob.techCompany.contactInformation.data}</div>
        <div>Company Info: {aJob.techCompany.summary}</div>
        <button
          type="button"
          className="btn btn-primary edit-me"
          onClick={closeModal}
        >
          close
        </button>
      </Modal>

      <div className="col-md-3">
        <div className="dog-card my-3 t-3">
          <div className="col-md-12 mb-4">
            <div className="card border-0 shadow">
              <img
                src={imageTest.imageUrl}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body text-center">
                <h5 className="card-title mb-0">{aJob.title}</h5>
                <div className="card-text text-black-50">{aJob.summary}</div>
                <button
                  type="button"
                  className="btn btn-primary edit-me"
                  onClick={onEditClick}
                >
                  Edit
                </button>
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

export default React.memo(JobCards);
