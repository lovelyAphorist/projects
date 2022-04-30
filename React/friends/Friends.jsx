import React, { useState, useEffect, useCallback } from "react";
import * as friendsService from "./friendsService";
import FriendCards from "./FriendCards";
import { useNavigate } from "react-router-dom";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";

function Friends() {
  const [pageFriendData, setPageFriendData] = useState({
    friendState: [],
    friendCoponents: [],
  });
  const [showFriends, setShowFriends] = useState({ show: false });
  const [searchData, setSearchData] = useState({
    search: "",
  });

  const [pageState, setPageState] = useState({ pageIndex: 0, pageSize: 4 });

  //pagination stuffs

  const onChange = (page) => {
    // debugger;
    console.log(page);
    setPageState({
      pageIndex: page - 1,
      pageSize: 4,
    });
  };

  // this pulls the friends from the AJAX call

  useEffect(() => {
    console.log("fetching friends");
    friendsService
      .retreiveFriends(pageState.pageIndex, pageState.pageSize)
      .then(onFetchFriendsSuccess)
      .catch(onFetchFriendsFail);
  }, [pageState]);

  //search funcanility
  const onFormChange = (event) => {
    // console.log("onChange", { syntheticEvent: event });
    const target = event.target;
    const newSearchValue = target.value;
    const nameOfField = target.name;
    // console.log({ nameOfField, newUserValue });
    setSearchData((prevState) => {
      // console.log("updater onChange");
      const searchData = {
        ...prevState,
      };
      searchData[nameOfField] = newSearchValue;
      return searchData;
    });
    console.log("end onChange");
  };

  function submitSearch() {
    console.log(searchData);
    console.log(searchData.search);
    friendsService
      .searchFriends(searchData.search)
      .then(onSearchSuccess)
      .catch(onSearchFail);
  }

  function onSearchSuccess(data) {
    console.log(data.data.item.pagedItems);
    let searchReturnInfo = data.data;
    onFetchFriendsSuccess(searchReturnInfo);
  }

  function onSearchFail(data) {
    console.log(
      data,
      "Fail, Fail, Fail, Fail. WEEEE WOOOOO WEEEE WOOOO WEEE WOOOOO!"
    );
  }

  //This puts the friends on the page
  function onFetchFriendsSuccess(response) {
    let arrayOfFriends = response.item.pagedItems;
    console.log(arrayOfFriends);
    setPageFriendData((prevState) => {
      const pFD = { ...prevState };
      pFD.friendState = arrayOfFriends;
      pFD.friendCoponents = arrayOfFriends.map(mapPeople);
      return pFD;
    });
  }

  function onFetchFriendsFail(response) {
    console.log(response);
  }

  //this toggles state to make the sho friends button work
  const toggleShowFriends = () => setShowFriends((value) => !value);

  //This makes the Ajac call to delete a friend
  const onDeleteClick = useCallback((friendId) => {
    const currentId = friendId;
    friendsService
      .deleteFriend(currentId)
      .then(onFriendDeleteSuccess)
      .catch(onFriendDeleteFail);
  }, []);

  //This is a shorter more effective method to rerender the friends after delete
  function onFriendDeleteSuccess(idFriend) {
    setPageFriendData((prevState) => {
      const pFD = { ...prevState };
      pFD.friendState = [...pFD.friendState];
      let testing = pFD.friendState.filter(({ id }) => id !== idFriend);
      // console.log(testing);
      pFD.friendCoponents = testing.map(mapPeople);
      return pFD;
    });
  }

  function onFriendDeleteFail(response) {
    console.log(response);
  }
  //This maps through the friends for rendering
  const mapPeople = (aPerson) => {
    console.log("mapping starting up");
    return (
      <FriendCards
        friend={aPerson}
        key={"GroupA-" + aPerson.id}
        onDelete={onDeleteClick}
        // onEdit={onEditClick}
      />
    );
  };

  //navigate to new/edit friends stuff
  const navigate = useNavigate();
  const goToPage = (e) => {
    console.log(e.currentTarget.dataset.page);
    navigate(e.currentTarget.dataset.page);
  };

  return (
    <React.Fragment>
      {/* <Routes>
        <Route path="/Friends/New" element={<FriendsNew />} />
      </Routes> */}
      <div className="d-flex justify-content-center">
        <h1>Friends</h1>
      </div>
      <div className="d-flex justify-content-center">
        <div className="container-lg">
          <div className="text-center">
            <div className="row justify-content-center my-5">
              <div className="col-lg-6">
                <button
                  onClick={toggleShowFriends}
                  type="button"
                  className="btn btn-primary"
                >
                  Hide/show Friends
                </button>

                {/* <div className="d-flex justify-content-center"> */}
                <button
                  onClick={goToPage}
                  type="button"
                  className="btn btn-primary"
                  data-page="/Friends/New"
                >
                  Create New Friend
                </button>
                <br />
                <div>
                  <label for="search" className="form-label">
                    Search for:
                  </label>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    className="form-control"
                    value={searchData.search}
                    onChange={onFormChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-info search"
                    id="search-btn"
                    onClick={submitSearch}
                  >
                    Search Friends
                  </button>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-content-center">
        {showFriends && (
          <div className="row">{pageFriendData.friendCoponents}</div>
        )}

        <Pagination
          locale={locale}
          onChange={onChange}
          current={pageState.pageSize}
          total={30}
        />
      </div>
    </React.Fragment>
  );
}

export default Friends;
