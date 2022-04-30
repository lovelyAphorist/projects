import axios from "axios";

var uploadService = {
  endpoint: "https://api.remotebootcamp.dev/api/",
};

let upload = (file) => {
    console.log(file)
    //let files= undefined
  const config = {
    method: "POST",
    url: uploadService.endpoint + "files",
    data: file,
    crossdomain: true,
    headers: { "Content-Type": "multipart/form-data" },
  };
  return axios(config).then((data)=>{
        return data});
};

let sendEmail = (data) => {
  const config = {
    method: "POST",
    url: uploadService.endpoint + "emails",
    data: data,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((data)=>{
        return data});
};

export {upload, sendEmail}