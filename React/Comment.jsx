import React, { useState } from "react";
import toastr from "react-toast-notifier";
import * as commentService from "./services/commentService";

function Products() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: 0,
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

  function submit() {
    console.log(formData);
    commentService
      .createComment(formData)
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
              <label htmlFor="title" className="form-label">
                title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                required
                value={formData.title}
                onChange={onFormChange}
              />
              <label htmlFor="body" className="form-label">
                Body:
              </label>
              <input
                type="text"
                id="body"
                name="body"
                className="form-control"
                value={formData.body}
                onChange={onFormChange}
                required
              />
              <label htmlFor="userId" className="form-label">
                userId:
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                className="form-control"
                value={formData.userId}
                onChange={onFormChange}
                required
              />

              <button
                onClick={submit}
                type="button"
                className="btn btn-info"
                id="submit"
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
