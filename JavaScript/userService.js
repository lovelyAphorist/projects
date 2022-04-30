var userService = {
  endpoint: "https://api.remotebootcamp.dev/api/",
};

userService.registerUser = (dataFromForm) => {
  const config = {
    method: "POST",
    url: friendsService.endpoint + "users/register",
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

userService.loginUser = (dataFromForm) => {
  const config = {
    method: "POST",
    url: friendsService.endpoint + "users/login",
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

userService.currentUser = (dataFromForm) => {
  const config = {
    method: "GET",
    url: friendsService.endpoint + "users/current",
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

userService.logOutUser = () => {
  const config = {
    method: "GET",
    url: friendsService.endpoint + "users/logout",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};