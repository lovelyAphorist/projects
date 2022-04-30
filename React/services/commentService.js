 import axios from "axios";
 
 var productService = {
  endpoint: "https://jsonplaceholder.typicode.com/posts"
}
 
let addComment = (dataFromForm) => {
        const config = {
          method: "POST",
          url: productService.endpoint,
          data: dataFromForm,
          crossdomain: true,
          headers: { "Content-Type": "application/json" },
        };

        return axios(config)
        
      };

      export {addComment}