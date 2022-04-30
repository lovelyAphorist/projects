import React from "react";
// import * as techService from "./techService";

function CompanyCards(props) {
  const aCompany = props.company;
  console.log(aCompany, "from Jobscard");
  const image = aCompany.images[0];
  console.log(image);
  return (
    <React.Fragment>
      <div className="col-md-4">
        <div className="dog-card my-4 t-4">
          <div className="col-md-12 mb-4">
            <div className="card border-0 shadow">
              <img src={image.imageUrl} className="card-img-top" alt="..." />
              <div className="card-body text-center">
                <h5 className="card-title mb-0">{aCompany.name}</h5>
                <div className="card-text text-black-50">
                  {aCompany.summary}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default React.memo(CompanyCards);
