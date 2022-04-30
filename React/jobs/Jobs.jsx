import React, { useState, useEffect } from "react";
import * as jobsService from "./jobsService";
import JobCards from "./JobCards";
import { useNavigate } from "react-router-dom";
import "rc-pagination/assets/index.css";

function Jobs() {
  const [pageJobData, setPageJobData] = useState({
    jobState: [],
    jobCoponents: [],
  });
  const [searchData, setSearchData] = useState({
    search: "",
  });

  // this pulls the jobs from the AJAX call

  useEffect(() => {
    console.log("fetching jobs");
    jobsService
      .retreiveJobs(0, 15)
      .then(onFetchJobsSuccess)
      .catch(onFetchJobsFail);
  }, []);

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
    jobsService
      .searchJobs(searchData.search)
      .then(onSearchSuccess)
      .catch(onSearchFail);
  }

  function onSearchSuccess(data) {
    console.log(data.data.item.pagedItems);
    let searchReturnInfo = data.data;
    onFetchJobsSuccess(searchReturnInfo);
  }

  function onSearchFail(data) {
    console.log(
      data,
      "Fail, Fail, Fail, Fail. WEEEE WOOOOO WEEEE WOOOO WEEE WOOOOO!"
    );
  }

  //This puts the Jobs on the page
  function onFetchJobsSuccess(response) {
    let arrayOfJobs = response.item.pagedItems;
    console.log(arrayOfJobs);
    setPageJobData((prevState) => {
      const pFD = { ...prevState };
      pFD.jobState = arrayOfJobs;
      pFD.jobCoponents = arrayOfJobs.map(mapJobs);
      return pFD;
    });
  }

  function onFetchJobsFail(response) {
    console.log(response);
  }

  //This maps through the Jobs for rendering
  const mapJobs = (aJob) => {
    console.log("mapping starting up");
    return <JobCards job={aJob} key={"GroupA-" + aJob.id} />;
  };

  //navigate to new/edit Jobss stuff
  const navigate = useNavigate();
  const goToPage = (e) => {
    console.log(e.currentTarget.dataset.page);
    navigate(e.currentTarget.dataset.page);
  };

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center">
        <h1>Jobs</h1>
      </div>
      <div className="d-flex justify-content-center">
        <div className="container-lg">
          <div className="text-center">
            <div className="row justify-content-center my-5">
              <div className="col-lg-6">
                {/* <div className="d-flex justify-content-center"> */}
                <button
                  onClick={goToPage}
                  type="button"
                  className="btn btn-primary"
                  data-page="/Jobs/New"
                >
                  Create New Job
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
                    Search Jobs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-content-center">
        <div className="row">{pageJobData.jobCoponents}</div>
      </div>
    </React.Fragment>
  );
}

export default Jobs;
