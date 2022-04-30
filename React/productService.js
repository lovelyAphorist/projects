 import axios from "axios";
 
 var productService = {
  endpoint: "https://api.remotebootcamp.dev/api/entities/products"
}
 
let createProduct = (dataFromForm) => {
        const config = {
          method: "POST",
          url: productService.endpoint,
          data: dataFromForm,
          crossdomain: true,
          headers: { "Content-Type": "application/json" },
        };

        return axios(config)
        
      };

      export {createProduct}