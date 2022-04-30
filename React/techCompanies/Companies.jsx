import React, { useState, useEffect } from "react";
// import * as techService from "./techService";
import * as techService from "./techService";
import CompanyCards from "./CompanyCards";

function Companies() {
  const [addCompanyForm, setAddCompanyForm] = useState({
    name: "",
    profile: "",
    summary: "",
    headline: "",
    contactInformation: "",
    slug: Math.floor(Math.random() * 1234),
    statusId: "Active",
    images: [
      {
        imageTypeId: 1,
        imageUrl: "",
      },
    ],
    urls: [""],
    tags: ["string"],
    friendIds: [0],
  });
  const [aCompany, setCompany] = useState({
    companyState: [],
    companyCoponents: [],
  });

  useEffect(() => {
    console.log("fetching companies");
    techService
      .retreiveCompany()
      .then(onretreiveCompanySuccess)
      .catch(onretreiveCompanyFail);
  }, []);

  function onretreiveCompanySuccess(response) {
    let arrayOfCompany = response.data.item.pagedItems;
    console.log(arrayOfCompany);
    setCompany((prevState) => {
      const pCD = { ...prevState };
      pCD.companyState = arrayOfCompany;
      pCD.companyCoponents = arrayOfCompany.map(mapCompany);
      return pCD;
    });
  }
  console.log(aCompany);
  function onretreiveCompanyFail(response) {
    console.log(response);
  }

  const mapCompany = (company) => {
    console.log("mapping starting up", company);
    return <CompanyCards company={company} key={"GroupA-" + company.id} />;
  };

  //Stuff for the form to work

  function onSubmit() {
    const data = {
      name: addCompanyForm.name,
      profile: addCompanyForm.profile,
      summary: addCompanyForm.summary,
      headline: addCompanyForm.headline,
      contactInformation: addCompanyForm.contact,
      slug: Math.floor(Math.random() * 1234),
      statusId: "Active",
      images: [
        {
          imageTypeId: 1,
          imageUrl: addCompanyForm.image,
        },
      ],
      urls: [addCompanyForm.website],
      tags: ["string"],
      friendIds: [0],
    };
    console.log(data);

    techService
      .submitCompany(data)
      .then(onSubmitCompanySuccess)
      .catch(onSubmitCompanyError);
  }

  const onSubmitCompanySuccess = (response) => {
    console.log(response);
  };

  const onSubmitCompanyError = (response) => {
    console.log(response);
  };

  const onFormFieldChange = (e) => {
    const target = e.target;
    const newUserValue = target.value;
    const nameOfField = target.name;
    setAddCompanyForm((prevState) => {
      const newUserObject = {
        ...prevState,
      };

      newUserObject[nameOfField] = newUserValue;
      console.log(newUserObject);
      return newUserObject;
    });
  };
  return (
    <React.Fragment>
      <h1>Companies</h1>
      <div className="container-lg">
        <div className="text-center">
          <h2>Tech Companies</h2>
          <p>To create a new company fill out this form</p>
        </div>
        <div className="row justify-content-center my-5">
          <div className="col-lg-6">
            <form id="Company">
              <label htmlFor="Name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={addCompanyForm.name}
                onChange={onFormFieldChange}
                required
              />

              <label htmlFor="profile" className="form-label">
                Profile:
              </label>
              <input
                type="text"
                id="profile"
                name="profile"
                className="form-control"
                value={addCompanyForm.profile}
                onChange={onFormFieldChange}
                required
              />
              <label htmlFor="summary" className="form-label">
                Summary:
              </label>
              <input
                type="text"
                id="summary"
                name="summary"
                className="form-control"
                value={addCompanyForm.summary}
                onChange={onFormFieldChange}
                required
              />
              <label htmlFor="headline" className="form-label">
                Headline:
              </label>
              <input
                type="text"
                id="headline"
                name="headline"
                className="form-control"
                value={addCompanyForm.headline}
                onChange={onFormFieldChange}
                required
              />
              <label htmlFor="contact" className="form-label">
                Headline:
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                className="form-control"
                value={addCompanyForm.contactInformation}
                onChange={onFormFieldChange}
                required
              />

              <label htmlFor="image" className="form-label">
                Photo:
              </label>
              <input
                type="text"
                id="image"
                name="image"
                className="form-control"
                value={addCompanyForm.images[0].imageUrl}
                onChange={onFormFieldChange}
                required
              />
              <label htmlFor="website" className="form-label">
                Website:
              </label>
              <input
                type="text"
                id="website"
                name="website"
                className="form-control"
                value={addCompanyForm.urls}
                onChange={onFormFieldChange}
                required
              />

              <button
                type="button"
                className="btn btn-info submit-form"
                id="create-company"
                onClick={onSubmit}
              >
                Create New Company!
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <CompanyCards /> */}
      <div className="container">
        <div className="row">{aCompany.companyCoponents}</div>
      </div>
    </React.Fragment>
  );
}

export default Companies;
