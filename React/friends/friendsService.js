import axios from "axios";

const friendsService = {
  endpoint: "https://api.remotebootcamp.dev/api/",
};

let retreiveFriends = (pageIndex, pageSize) => {
// let pageIndex= page-1
  const config = {
    method: "GET",
    url: `${friendsService.endpoint}/friends?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
 console.log(config.url)
  return axios(config).then(response=>{return response.data});
};

let deleteFriend = (idFriend) => {
  const config = {
    method: "DELETE",
    url: friendsService.endpoint + "friends/" + idFriend,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => idFriend);
};

  let getFriendById = (friendId) => {
    const config = {
      method: "GET",
      url: friendsService.endpoint + `friends/${friendId}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  }

  let editFriendById = (friendId, payload) => {
    const config = {
      method: "PUT",
      url: friendsService.endpoint + `friends/${friendId}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
  
    return axios(config);
  }

  let addFriend = (dataFromForm) => {
  const config = {
    method: "POST",
    url: friendsService.endpoint + "friends",
    data: dataFromForm,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => dataFromForm);
}; 

   let searchFriends = (search) => {
        const config = {
          method: "GET",
          url: "https://api.remotebootcamp.dev/api/friends/search?pageIndex=0&pageSize=15&q=" + search,
          crossdomain: true,
          headers: { "Content-Type": "application/json" },
        };
         return axios(config)
         };
export { retreiveFriends, deleteFriend, getFriendById, editFriendById, addFriend, searchFriends };