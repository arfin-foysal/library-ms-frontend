import React from "react";
import avatar from "./../../../../src/assets/images/profile-picture.png/";
const AllAuthor = () => {
  return (
    <div className=" container">
      <div class="row">
        <div className="col"></div>
        <div className="col"></div>{" "}
        <div className="col-md-4 co-12 my-4">
          <input
            type="search"
            className=" form-control rounded-5"
            name=""
            id=""
            placeholder="Search by your preference"
          />
        </div>
      </div>

      <h3>All Author</h3>
      <div className="my-5">
              <div className="row shadow-lg border p-2">
                  <div className="col pt-3 text-center">
                      <img src={avatar} width={100} alt="" />
                  </div>
                  <div className="col-md-8">
                      <h5>Vladimir Nabokov</h5>
                      <p>Author Demography: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.</p>
                      <p>17 published</p>
                  </div>
                  <div className="col mt-5 text-center">
                      <button className="btn btn-primary">View Books</button>
                  </div>
        </div>
      </div>
    </div>
  );
};

export default AllAuthor;
