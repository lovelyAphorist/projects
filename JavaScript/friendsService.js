var friendsService = {
  endpoint: "https://api.remotebootcamp.dev/api/",
};

friendsService.registerUser = (dataFromForm) => {
  const config = {
    method: "POST",
    url: friendsService.endpoint + "users/register",
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

friendsService.loginUser = (dataFromForm) => {
  const config = {
    method: "POST",
    url: friendsService.endpoint + "users/login",
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

friendsService.currentUser = (dataFromForm) => {
  const config = {
    method: "GET",
    url: friendsService.endpoint + "users/current",
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

friendsService.logOutUser = () => {
  const config = {
    method: "GET",
    url: friendsService.endpoint + "users/logout",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

friendsService.addFriend = (dataFromForm) => {
  const config = {
    method: "POST",
    url: friendsService.endpoint + "friends",
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => dataFromForm);
};
friendsService.retreiveFriends = () => {
  const config = {
    method: "GET",
    url: friendsService.endpoint + "friends?pageIndex=0&pageSize=12",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};
friendsService.editFriend = () => {
  const config = {
    method: "GET",
    url: friendsService.endpoint + "friends?pageIndex=0&pageSize=12",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};
friendsService.changeFriend = (dataFromForm) => {
  const config = {
    method: "PUT",
    url: friendsService.endpoint + "friends/" + dataFromForm.id,
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => dataFromForm);
};

friendsService.deleteFriend = (idFriend) => {
  const config = {
    method: "DELETE",
    url: friendsService.endpoint + "friends/" + idFriend,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => idFriend);
};
