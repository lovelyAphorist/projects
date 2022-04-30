var eventsService = {
  endpoint: "https://api.remotebootcamp.dev/api/",
};

eventsService.addEvent = (dataFromForm) => {
  const config = {
    method: "POST",
    url: friendsService.endpoint + "events",
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => dataFromForm);
};

eventsService.retreiveEvents = () => {
  const config = {
    method: "GET",
    url:
      eventsService.endpoint +
      "events/search?pageIndex=0&pageSize=12&dateStart=1%2F1%2F1753&dateEnd=12%2F31%2F9999",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

eventsService.changeEvent = (dataFromForm) => {
  const config = {
    method: "PUT",
    url: friendsService.endpoint + "events/" + dataFromForm.id,
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => dataFromForm);
};
//https://api.remotebootcamp.dev/api/events/feed?pageIndex=0&pageSize=1

eventsService.newestEvent = () => {
  const config = {
    method: "GET",
    url: eventsService.endpoint + "events/feed?pageIndex=0&pageSize=1",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

eventsService.upload = (file) => {
  console.log('this is uplaod',file)
  const config = {
    method: "POST",
    url: friendsService.endpoint + "files",
    data: file,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};
