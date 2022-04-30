import React, { useState } from "react";
import toastr from "react-toast-notifier";
import * as productService from "../../services/productService";

function Products() {
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    description: "",
  });

  const onFormChange = (event) => {
    const target = event.target;
    const newUserValue = target.value;
    const nameOfField = target.name;

    setFormData((prevState) => {
      const formData = {
        ...prevState,
      };
      formData[nameOfField] = newUserValue;
      return formData;
    });

    // console.log("end onChange");
  };

  function submitProduct() {
    console.log(formData);
    productService
      .createProduct(formData)
      .then(onCreatProductSuccess)
      .catch(onCreateProductFail);
  }
  function onCreatProductSuccess(data) {
    console.log(data.data.item);
    let productId = data.data.item;
    toastr["success"](
      "Your new product has been created! Product ID is:",
      productId
    );
  }

  function onCreateProductFail(data) {
    console.log(
      data,
      "Fail, Fail, Fail, Fail. WEEEE WOOOOO WEEEE WOOOO WEEE WOOOOO!"
    );
    toastr["error"]("Sorry your product was not created.");
  }

  return (
    <React.Fragment>
      <div className="container-lg">
        <div className="text-center">
          <h2>Create A new Product</h2>
          <p>Enter your product info here to get started!</p>
        </div>
        <div className="row justify-content-center my-5">
          <div className="col-lg-6 form-group">
            <form>
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                required
                value={formData.name}
                onChange={onFormChange}
              />
              <label htmlFor="manufacturer" className="form-label">
                Manufacturer:
              </label>
              <input
                type="text"
                id="manufacturer"
                name="manufacturer"
                className="form-control"
                value={formData.manufacturer}
                onChange={onFormChange}
                required
              />
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={onFormChange}
                required
              />
              <label htmlFor="cost" className="form-label">
                Cost:
              </label>
              <input
                type="text"
                className="form-control"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={onFormChange}
                required
              />

              <button
                onClick={submitProduct}
                type="button"
                className="btn btn-info"
                id="form-submit-register"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Products;
