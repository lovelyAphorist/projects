import React, { useState, useEffect } from "react";
import toastr from "toastr";
import "react-toastify/dist/ReactToastify.css";
// import * as jobsService from "./jobsService";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import * as jobsService from "./jobsService";
function JobsNew() {
  const [addJobForm, setAddJobForm] = useState({
    title: "",
    description: "",
    summary: "",
    pay: "",
    slug: Math.floor(Math.random() * 1234),
    statusId: "Active",
    techCompanyId: "",
    skills: ["string"],
  });
  const jobLocation = useLocation();
  const jobPassedFromState = jobLocation?.state?.payload;
  //   console.log(jobPassedFromState);

  const navigate = useNavigate();

  const jobObject = useParams();
  //   console.log(jobObject);

  useEffect(() => {
    let isIdPresent = false;
    if (jobObject?.jobId) {
      if (jobPassedFromState) {
        JobTransported(jobPassedFromState);
      } else {
        let thisIsPointless = jobObject.jobId;
        jobsService
          .getJobsById(thisIsPointless)
          .then(onFindIdSuccess)
          .catch(onFindIdError);
      }
      isIdPresent = true;
      console.log("working", jobObject, isIdPresent);
    }
  }, []);

  function onSubmit() {
    const data = {
      title: addJobForm.title,
      description: addJobForm.description,
      summary: addJobForm.summary,
      pay: addJobForm.pay,
      slug: Math.floor(Math.random() * 123468),
      statusId: "Active",
      techCompanyId: addJobForm.techCompanyId,
      skills: ["string"],
    };
    console.log(data);
    let thisIsPointless = jobObject.jobId;
    if (thisIsPointless) {
      jobsService
        .editJobsById(thisIsPointless, data)
        .then(onEditSuccess)
        .catch(onEditError);
    } else {
      jobsService.addJob(data).then(onActionSuccess).catch(onActionError);
    }
  }
  const onActionSuccess = (response) => {
    console.log(
      toastr.success("Job Added Successfully"),
      response,
      navigate(`/Jobs`)
    );
  };

  const onActionError = (errResponse) => {
    console.log(toastr.error("Failed To Add Job", errResponse));
  };

  const onEditSuccess = (response) => {
    console.log(
      toastr.success("Job Edited Successfully"),
      response,
      navigate(`/Jobs`)
    );
  };

  const onEditError = (errResponse) => {
    toastr.error("Failed To Edit Job", errResponse);
  };

  const onFormFieldChange = (e) => {
    const target = e.target;
    const newUserValue = target.value;
    const nameOfField = target.name;
    setAddJobForm((prevState) => {
      const newUserObject = {
        ...prevState,
      };

      newUserObject[nameOfField] = newUserValue;
      console.log(newUserObject);
      return newUserObject;
    });
  };

  const JobTransported = (job) => {
    const theJob = job;
    const newJobForm = {
      title: theJob.title,
      description: theJob.description,
      summary: theJob.summary,
      pay: theJob.pay,
      slug: Math.floor(Math.random() * 123468),
      statusId: "Active",
      techCompanyId: theJob.techCompanyId,
      skills: ["string"],
    };
    console.log("jobs transported", newJobForm);
    setAddJobForm(newJobForm);
  };

  const onFindIdSuccess = (response) => {
    console.log(response);
    const theJob = response.data.item;
    const newJobForm = {
      title: theJob.title,
      description: theJob.description,
      summary: theJob.summary,
      pay: theJob.pay,
      slug: Math.floor(Math.random() * 123468),
      statusId: "Active",
      techCompanyId: theJob.techCompanyId,
      skills: ["string"],
    };
    console.log("jobs edit stuff", newJobForm);
    setAddJobForm(newJobForm);
  };

  const onFindIdError = (err) => {
    console.log(err);
  };

  return (
    <React.Fragment>
      <div className="container-lg">
        <div className="text-center">
          <div className="row justify-content-center my-5">
            <div className="col-lg-6">
              <form id="job">
                <label for="title" className="form-label">
                  Job Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  value={addJobForm.title}
                  onChange={onFormFieldChange}
                  required
                />
                <label for="description" className="form-label">
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="form-control"
                  value={addJobForm.description}
                  onChange={onFormFieldChange}
                  required
                />
                <label for="summary" className="form-label">
                  Summary:
                </label>
                <input
                  type="text"
                  id="summary"
                  name="summary"
                  className="form-control"
                  value={addJobForm.summary}
                  onChange={onFormFieldChange}
                  required
                />
                <label for="pay" className="form-label">
                  Pay:
                </label>
                <input
                  type="text"
                  id="pay"
                  name="pay"
                  className="form-control"
                  value={addJobForm.pay}
                  onChange={onFormFieldChange}
                  required
                />
                <label for="tech-company">Tech Company ID</label>
                <select
                  onChange={onFormFieldChange}
                  className="form-control"
                  id="tech-company"
                  name="techCompanyId"
                  // name={addJobForm.techCompanyId}
                >
                  <option value={33818}>33818 - Ollivanders</option>
                  <option value={33817}>33817 - Weasleys Wizard Wheezes</option>
                  <option value={33816}>33816 - Gringotts</option>
                </select>

                <button
                  type="button"
                  className="btn btn-info submit-form create-job"
                  onClick={onSubmit}
                >
                  Create New Job!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default JobsNew;
