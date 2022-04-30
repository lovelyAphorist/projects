import React, { useState } from "react";
import * as userService from "./userService";
import toastr from "toastr";

function Register() {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "",
  });
  const onFormChange = (event) => {
    // console.log("onChange", { syntheticEvent: event });
    const target = event.target;
    const newUserValue = target.value;
    const nameOfField = target.name;
    // console.log({ nameOfField, newUserValue });
    setFormData((prevState) => {
      // console.log("updater onChange");
      const formData = {
        ...prevState,
      };
      formData[nameOfField] = newUserValue;
      return formData;
    });

    console.log("end onChange");
  };
  // const captureFormData=()=>{

  // }

  function submitRegisterUser() {
    console.log(formData);
    userService
      .registerUser(formData)
      .then(onRegisterSuccess)
      .catch(onRegisterFail);
  }
  function onRegisterSuccess(data) {
    console.log(data);
    toastr["success"](
      "Thanks for creating a new account with us!",
      "Registration Complete!"
    );
  }

  function onRegisterFail(data) {
    console.log(
      data,
      "Fail, Fail, Fail, Fail. WEEEE WOOOOO WEEEE WOOOO WEEE WOOOOO!"
    );
    toastr["error"](
      "Sorry your registration was not processed.",
      "Registration Failure"
    );
  }
  return (
    <React.Fragment>
      <div className="container-lg">
        <div className="text-center">
          <h2>Sign-Up for Starter Tasks</h2>
          <p>Enter your info here to get started!</p>
        </div>
        <div className="row justify-content-center my-5">
          <div className="col-lg-6">
            <form>
              <label for="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                placeholder="John"
                required
                value={formData.firstName}
                onChange={onFormChange}
              />
              <label for="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                className="form-control"
                value={formData.lastName}
                onChange={onFormChange}
                required
              />
              <label for="email" className="form-label">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="John.Doe@gmail.com"
                className="form-control"
                value={formData.email}
                onChange={onFormChange}
                required
              />
              <label for="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={onFormChange}
                required
              />
              <label for="passwordConfirm" className="form-label">
                Password Confirm:
              </label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                className="form-control"
                value={formData.passwordConfirm}
                onChange={onFormChange}
                required
              />
              <label for="avatarUrl" className="form-label">
                Avatar:
              </label>
              <input
                type="text"
                id="avatarUrl"
                name="avatarUrl"
                placeholder="Any Img URL"
                className="form-control"
                value={formData.avatarUrl}
                onChange={onFormChange}
                required
              />
              <label for="tenantId" className="form-label">
                Tenant ID:
              </label>
              <input
                type="text"
                id="tenantId"
                name="tenantId"
                placeholder="U02LH18LZQ8"
                className="form-control"
                value={formData.tenantId}
                onChange={onFormChange}
                required
              />
              <button
                onClick={submitRegisterUser}
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

export default Register;
