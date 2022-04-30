var jobsService = {
  endpoint: "https://api.remotebootcamp.dev/api/"
}


       jobsService.retreiveJobs = () => {
        const config = {
          method: "GET",
          url: friendsService.endpoint + "jobs?pageIndex=0&pageSize=20",
          crossdomain: true,
          headers: { "Content-Type": "application/json" },
        };

        return axios(config)
        };


          jobsService.submitJob = (dataFromForm) => {
        const config = {
          method: "POST",
          url: jobsService.endpoint + "jobs",
          data: dataFromForm,
          crossdomain: true,
          headers: { "Content-Type": "application/json" },
        };

        return axios(config)
        
      };

        jobsService.changeJob = (dataFromForm) => {
        const config = {
          method: "PUT",
          url: friendsService.endpoint + "jobs/"+dataFromForm.id,
          data: dataFromForm,
          crossdomain: true,
          headers: { "Content-Type": "application/json" },
        };

        return axios(config)
         };

         jobsService.searchJobs = (search) => {
        const config = {
          method: "GET",
          url: "https://api.remotebootcamp.dev/api/jobs/search?pageIndex=0&pageSize=15&searchTerm=" + search,
          crossdomain: true,
          headers: { "Content-Type": "application/json" },
        };
         return axios(config)
         };