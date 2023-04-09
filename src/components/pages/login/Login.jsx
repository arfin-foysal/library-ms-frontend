import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../../assets/logo/logo.png"

const Login = () => {
  return (
    <div className="container">
      {/* <!-- Outer Row --> */}
      <div className="row justify-content-center my-5">
        <div className="col-12 col-md-4 pt-5">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                {/* <div className="col-lg-6 d-none d-lg-block bg-login-image"></div> */}
                <div className="col">
                  <div className="p-5">
                    <div className="text-center pb-3">
                      <img src={logo} alt="" width={150} />
        
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user shadow
                          
                          "
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                        />
                      </div>
                      <div className="form-group pt-2">
                        <input
                          type="password"
                          className="form-control form-control-user shadow"
                          id="exampleInputPassword"
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group pt-3 text-center">
                        <Link
                        to="index.html"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Login
                      </Link>
                      </div>
                      
                    </form>
                    <hr />
                    <div className="text-center ">
                      <Link
                        className="small text-dark"
                        to="forgot-password.html"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    {/* <div className="text-center">
                      <Link className="small text-dark" to="/signup">
                        Create an Account!
                      </Link>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
