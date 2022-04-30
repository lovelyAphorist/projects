import axios from "axios";


var eventsService = {
  endpoint: "https://api.remotebootcamp.dev/api/",
};

let addEvent = (dataFromForm) => {
  const config = {
    method: "POST",
    url: eventsService.endpoint + "events",
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => dataFromForm);
};

let retreiveEvents = () => {
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

let changeEvent = (dataFromForm) => {
  const config = {
    method: "PUT",
    url: eventsService.endpoint + "events/" + dataFromForm.id,
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => dataFromForm);
};
//https://api.remotebootcamp.dev/api/events/feed?pageIndex=0&pageSize=1

let newestEvent = () => {
  const config = {
    method: "GET",
    url: eventsService.endpoint + "events/feed?pageIndex=0&pageSize=1",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

let findGeoEvent = (lat, lng) => {
  const config = {
    method: "GET",
    url: eventsService.endpoint + `events/search/geo?latitude=${lat}&longitude=${lng}&radius=100`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export {addEvent, retreiveEvents, changeEvent, newestEvent, findGeoEvent  };