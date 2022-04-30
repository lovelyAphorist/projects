import axios from "axios";

var techService = {
  endpoint: "https://api.remotebootcamp.dev/api/",
};

let submitCompany = (dataFromForm) => {
  const config = {
    method: "POST",
    url: techService.endpoint + "techcompanies",
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let retreiveCompany = () => {
  const config = {
    method: "GET",
    url: techService.endpoint + "techcompanies?pageIndex=0&pageSize=12",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};
let editCompany = () => {
  const config = {
    method: "GET",
    url: techService.endpoint + "techcompanies?pageIndex=0&pageSize=12",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};
let changeComapny = (dataFromForm) => {
  const config = {
    method: "PUT",
    url: techService.endpoint + "techcompanies/" + dataFromForm.id,
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { editCompany, changeComapny, retreiveCompany, submitCompany };
