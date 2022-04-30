import React, { useState } from "react";
import * as userService from "./userService";
import toastr from "toastr";

function Login() {
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
    email: "",
    password: "",
    tenantId: "U02LH18LZQ8",
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
  };

  function submitLoginUser() {
    console.log(formData);
    userService.loginUser(formData).then(onLoginSuccess).catch(onLoginFail);
  }
  function onLoginSuccess(data) {
    console.log(data);
    toastr["success"]("Thanks for loginging with us!", "Login Complete!");
    window.location.href = "/";
  }

  function onLoginFail(data) {
    console.log(
      data,
      "Fail, Fail, Fail, Fail. WEEEE WOOOOO WEEEE WOOOO WEEE WOOOOO!"
    );
    toastr["error"]("Sorry your login was not processed.", "Login Failure");
  }

  return (
    <React.Fragment>
      <h1 className="text-center">Login</h1>
      <p className="text-center">
        Login to your account here. If you need to register click the register
        button in the upper right corner.
      </p>
      <div>
        <div className="container-lg">
          {/* <div className="text-center">
      <h2>User Login</h2>
      <p>To register for a new account click here!</a></p>
    </div> */}
          <div className="row justify-content-center my-5">
            <div className="col-lg-6">
              <form>
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

                <button
                  onClick={submitLoginUser}
                  type="button"
                  className="btn btn-info"
                  id="form-submit-login"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
