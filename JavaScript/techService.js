
 var techService = {
  endpoint: "https://api.remotebootcamp.dev/api/"
 }


    techService.submitFriend = (dataFromForm) => {
        const config = {
          method: "POST",
          url: techService.endpoint + "techcompanies",
          data: dataFromForm,
          crossdomain: true,
          headers: { "Content-Type": "application/json" },
        };

        return axios(config)
        
      };

      techService.retreiveFriend = () => {
        const config = {
          method: "GET",
          url: techService.endpoint + "techcompanies?pageIndex=0&pageSize=12",
          crossdomain: true,
          headers: { "Content-Type": "application/json" },
        };

        return axios(config)
        
      };
       techService.editFriend = () => {
        const config = {
          method: "GET",
          url: techService.endpoint + "techcompanies?pageIndex=0&pageSize=12",
          crossdomain: true,
          headers: { "Content-Type": "application/json" },
        };

        return axios(config)
        
      };
      techService.changeFriend = (dataFromForm) => {
        const config = {
          method: "PUT",
          url: techService.endpoint + "techcompanies/"+dataFromForm.id,
          data: dataFromForm,
          crossdomain: true,
          headers: { "Content-Type": "application/json" },
        };

        return axios(config)
         };