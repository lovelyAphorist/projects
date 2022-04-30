import React, { useState } from "react";
import * as uploadService from "./uploadService";
import { useDropzone } from "react-dropzone";
//import debug from "sabio-debug";

function TestAndAjax() {
  const [selectedFile, setSelectedFile] = useState();
  const [selectedManyFile, setSelectedManyFile] = useState([{}]);
  const [emailForm, setAddEmailForm] = useState({
    to: [""],
    bcc: "",
    body: "",
    name: "",
  });
  // console.log(selectedFile);
 // const _logger = debug.extend("UserRegister");
  //_logger("Something important somewhere in a function within your component");
  function onFormSubmit() {
    // const data = { ...addFriendForm };
    const data = {
      to: [emailForm.to],
      bcc: emailForm.bcc,
      body: emailForm.body,
      name: emailForm.name,
    };
    console.log(data);

    uploadService
      .sendEmail(data)
      .then(onSendEmailSuccess)
      .catch(onSendEmailError);
  }
  const onSendEmailSuccess = (response) => {
    console.log(response);
  };

  const onSendEmailError = (response) => {
    console.log(response);
  };

  const onFormFieldChange = (e) => {
    const target = e.target;
    const newUserValue = target.value;
    const nameOfField = target.name;
    setAddEmailForm((prevState) => {
      const newUserObject = {
        ...prevState,
      };

      newUserObject[nameOfField] = newUserValue;
      // console.log(newUserObject);
      return newUserObject;
    });
  };

  // const onCancle = () => {
  //   console.log("I've been clicked");
  // };

  //files stuff

  const onFileChange = (e) => {
    let uploadThis = new FormData();
    // console.log(e.target.files[0]);
    let file = e.target.files[0];
    uploadThis.append("file", file);
    // console.log(file.name);
    // console.log("this is the form data", formData);
    setSelectedFile(uploadThis);
    // uploadService.upload(uploadThis).then(onUplaodSuccess).catch(onUploadError);
  };

  const onManyFilesFieldChange = (e) => {
    let uploadManyFiles = new FormData();
    console.log(e.target.files[0]);
    let file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      uploadManyFiles.append("file", file);
    }
    // file.each((files) => formData.append(files.name, files));
    // formData.append(file.name, file);
    // console.log(file.name);

    setSelectedManyFile(uploadManyFiles);
  };

  function onManySubmit() {
    // const data = { ...addFriendForm };
    const data = selectedManyFile;
    console.log(data);

    uploadService.upload(data).then(onUplaodSuccess).catch(onUploadError);
  }

  function onSubmit() {
    // const data = { ...addFriendForm };
    const data = selectedFile;
    // console.log("test", selectedFile.FormData);
    // console.log(selectedFile);
    // console.log(data);

    uploadService.upload(data).then(onUplaodSuccess).catch(onUploadError);
  }
  const onUplaodSuccess = (response) => {
    console.log(response.data.items[0]);
  };

  const onUploadError = (response) => {
    console.log(response);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onFileChange,
  });

  return (
    <React.Fragment>
      <main role="main">
        <div className="container">
          {/* <button className="btn btn-primary btn-lg" onClick={onCancle}>
            Click Me
          </button> */}
          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">Send a email</h1>
              <p className="col-md-8 fs-4">Because why not!?</p>

              <form id="job">
                <label htmlFor="title" className="form-label">
                  Your Email:
                </label>
                <input
                  type="text"
                  id="to"
                  name="to"
                  className="form-control"
                  value={[emailForm.to]}
                  onChange={onFormFieldChange}
                  required
                />
                <label htmlFor="description" className="form-label">
                  Send to:
                </label>
                <input
                  type="text"
                  id="bcc"
                  name="bcc"
                  className="form-control"
                  value={emailForm.bcc}
                  onChange={onFormFieldChange}
                  required
                />
                <label htmlFor="summary" className="form-label">
                  Body:
                </label>
                <input
                  type="text"
                  id="body"
                  name="body"
                  className="form-control"
                  minLength="10"
                  value={emailForm.body}
                  onChange={onFormFieldChange}
                  required
                />
                <label htmlFor="pay" className="form-label">
                  Your Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={emailForm.name}
                  onChange={onFormFieldChange}
                  required
                />
              </form>

              <p>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={onFormSubmit}
                >
                  Send your email
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2>Upload One File</h2>
              <p>Upload a file</p>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={onFileChange}
                />
                <br />

                <button
                  type="button"
                  className="btn btn-warning upload"
                  onClick={onSubmit}
                >
                  Upload
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <h2>Drag and Drop A file</h2>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
              <button
                type="button"
                className="btn btn-warning upload"
                onClick={onSubmit}
              >
                Upload
              </button>
            </div>
            <div className="col-md-4">
              <h2>Uplaod Multiple Files</h2>

              <form>
                <label htmlFor="files">Select files:</label>
                <input
                  type="file"
                  id="files"
                  name="files"
                  className="form-control"
                  multiple
                  onChange={onManyFilesFieldChange}
                />
                <br />

                <button
                  type="button"
                  className="btn btn-warning upload"
                  onClick={onManySubmit}
                >
                  Upload
                </button>
              </form>
            </div>
          </div>

          <hr />
        </div>
      </main>
    </React.Fragment>
  );
}

export default TestAndAjax;
