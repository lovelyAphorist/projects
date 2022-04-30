import axios from "axios";

const jobsService = {
  endpoint: "https://api.remotebootcamp.dev/api/",
};

let retreiveJobs = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${jobsService.endpoint}/jobs?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  console.log(config.url);
  return axios(config).then((response) => {
    return response.data;
  });
};

let getJobsById = (JobId) => {
  const config = {
    method: "GET",
    url: jobsService.endpoint + `jobs/${JobId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let editJobsById = (JobId, payload) => {
  const config = {
    method: "PUT",
    url: jobsService.endpoint + `jobs/${JobId}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let addJob = (dataFromForm) => {
  const config = {
    method: "POST",
    url: jobsService.endpoint + "jobs",
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => dataFromForm);
};

let searchJobs = (search) => {
  const config = {
    method: "GET",
    url:
      "https://api.remotebootcamp.dev/api/jobs/search?pageIndex=0&pageSize=15&searchTerm=" +
      search,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
export { retreiveJobs, getJobsById, editJobsById, addJob, searchJobs };
