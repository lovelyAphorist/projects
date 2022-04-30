import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// import AddNewFriend from "./AddNewFriend";
// import { Route } from "react-router-dom";

function FriendCards(props) {
  const aPerson = props.friend;
  const onDeleteClick = (e) => {
    e.preventDefault();
    props.onDelete(props.friend.id);
  };
  const navigate = useNavigate();

  FriendCards.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    summary: PropTypes.number.isRequired,
    imageUrl: PropTypes.number,
  };

  const onEditClick = () => {
    const transporting = { type: "Friend", payload: aPerson };
    navigate(`new/${aPerson.id}`, { state: transporting });
  };

  return (
    <div className="col-md-3">
      <div className="dog-card my-3 t-3">
        <div className="col-md-12 mb-4">
          <div className="card border-0 shadow">
            <img
              src={aPerson.primaryImage.imageUrl}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body text-center">
              <h5 className="card-title mb-0">{aPerson.title}</h5>
              <div className="card-text text-black-50">{aPerson.summary}</div>
              <button
                type="button"
                className="btn btn-primary edit-me"
                onClick={onEditClick}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger delete-me"
                onClick={onDeleteClick}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FriendCards);
