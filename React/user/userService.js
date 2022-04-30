import axios from "axios";

const userService = {
  endpoint: "https://api.remotebootcamp.dev/api/",
};

 let registerUser = (dataFromForm) => {
  const config = {
    method: "POST",
    url: userService.endpoint + "users/register",
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let loginUser = (dataFromForm) => {
  const config = {
    method: "POST",
    url: userService.endpoint + "users/login",
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let currentUser = () => {
  const config = {
    method: "GET",
    url: userService.endpoint + "users/current",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let currentUserInfo = (id) => {
  const config = {
    method: "GET",
    url: userService.endpoint + "users/"+id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

 let logOutUser = () => {
  const config = {
    method: "GET",
    url: userService.endpoint + "users/logout",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { registerUser, loginUser, currentUser, currentUserInfo, logOutUser };
