import { useFormik } from "formik";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Loader from "./../../../dashboard/common/Loader";
import { FcUnlock } from 'react-icons/fc';
import avatar from "./../../../../assets/images/profile-picture.png";
import { useGetSingleUserQuery, useProfileUpdateMutation } from "../../../../services/clientSiteApi";
import { Link } from "react-router-dom";
import ClientPageHeader from "../common/ClientPageHeader";

const PersonalInfo = () => {
  const profileRes = useGetSingleUserQuery();

  const [profileUpdate, res] = useProfileUpdateMutation();
  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }



  const formik = useFormik({

    enableReinitialize: true,

    initialValues: {
      name: profileRes?.data?.data?.name,
      phone: profileRes?.data?.data?.phone,
      email: profileRes?.data?.data?.email,
      location: profileRes?.data?.data?.location,
      username: profileRes?.data?.data?.username,
      gender: profileRes?.data?.data?.gender,
      description: profileRes?.data?.data?.description,
      profile_photo_path: profileRes?.data?.data?.profile_photo_path,

    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("gender", values.gender);
      formData.append("profile_photo_path", values.profile_photo_path);
      formData.append("phone", values.phone);
      formData.append("location", values.location);
      formData.append("description", values.description);
      // resetForm();

      try {
        const result = await profileUpdate(formData).unwrap();
        toast.success(result.message);

      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });
  return (
    <div>
      <ClientPageHeader title="Personal Information"/>
      <div className=" d-flex justify-content-between">
        <div>
          <h4>Personal Information</h4>
          <p>Tell us more about you</p>
        </div>

        <div>
          <Link to="/client-dashboard/password-change" className=" btn btn-warning btn-sm">
            <FcUnlock size={22} />
          </Link>
        </div>

      </div>
      <div>
        <div>
          <form
            className="form-sample"
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
          >
            <div className="row ">
              {profileRes.isFetching && <Loader />}
              {/* {profileRes.isSuccess && ( */}

              <div className="form-group  col-md-6 my-1">
                <label className="col-12 col-form-label">Full Name</label>
                <div className="col-12">
                  <input
                    placeholder="Enter Name"
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    required
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.name && formik.touched.name
                        ? "form-control form-control-user is-invalid  shadow"
                        : "form-control form-control-user shadow"
                    }
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <small className="text-danger">{formik.errors.name}</small>
                  ) : null}
                </div>
              </div>
              <div className="form-group  col-md-6 my-1">
                <label className="col-12 col-form-label"> Username</label>
                <div className="col-12">
                  <input
                    placeholder="Enter Username"
                    type="text"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    required
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.username && formik.touched.username
                        ? "form-control form-control-user is-invalid  shadow"
                        : "form-control form-control-user shadow"
                    }
                  />
                  {formik.errors.username && formik.touched.username ? (
                    <small className="text-danger">{formik.errors.username}</small>
                  ) : null}
                </div>
              </div>
              <div className="form-group  col-md-6 my-1">
                <label className="col-12 col-form-label">Phone Number</label>
                <div className="col-12">
                  <input
                    placeholder="Enter Username"
                    type="number"
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    required
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.phone && formik.touched.phone
                        ? "form-control form-control-user is-invalid  shadow"
                        : "form-control form-control-user shadow"
                    }
                  />
                </div>
              </div>

              <div className="form-group  col-md-6 my-1">
                <label className="col-12 col-form-label">Email Address</label>
                <div className="col-12">
                  <input
                    placeholder="Enter Email Address"
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    required
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.email && formik.touched.email
                        ? "form-control form-control-user is-invalid  shadow"
                        : "form-control form-control-user shadow"
                    }
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <small className="text-danger">{formik.errors.email}</small>
                  ) : null}
                </div>
              </div>

              <div className="form-group  col-md-6 my-1">
                <label className="col-12 col-form-label">Gender</label>
                <div className="col-12">
                  <select
                    name="gender"
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                    className="form-control form-control-user shadow"

                  >
                    <option value="">--select--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>

                </div>
              </div>

              <div className="form-group  col-md-6 my-1">
                <label className="col-12 col-form-label">Location</label>
                <div className="col-12">
                  <input
                    placeholder="Enter Location"
                    type="text"
                    name="location"
                    onChange={formik.handleChange}
                    value={formik.values.location}
                    required
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.location && formik.touched.location
                        ? "form-control form-control-user is-invalid  shadow"
                        : "form-control form-control-user shadow"
                    }
                  />
                  {formik.errors.location && formik.touched.location ? (
                    <small className="text-danger">
                      {formik.errors.location}
                    </small>
                  ) : null}
                </div>
              </div>


              <div className="form-group  col-md-6 my-1">
                <label className="col-12 col-form-label">Photo</label>
                <div className="col-12  ">
                  <input
                    name="profile_photo_path"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      formik.setFieldValue(
                        "profile_photo_path",
                        e.currentTarget.files[0]
                      );
                      handelImage(e);
                    }}
                    className="form-control form-control-user shadow"
                  />
                </div>
              </div>

              <div className="form-group  col-md-6 my-1">
                <label className="col-12 col-form-label">Description</label>
                <div className="col-12">
                  <textarea
                    className="form-control form-control-user shadow"
                    type="text"
                    name="description"
                    placeholder="Enter Description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    onBlur={
                      formik.handleBlur
                    }
                    id=""
                    cols="1"
                    rows="1"
                  ></textarea>

                  {formik.errors.description && formik.touched.description ? (
                    <small className="text-danger">
                      {formik.errors.description}
                    </small>
                  ) : null}
                </div>
              </div>

              <div className="mx-4">
                {previewImage ? (
                  <img
                    className="py-2"
                    src={previewImage}
                    width="80px"
                    height="80px"
                    alt=""
                  />
                ) : (
                  <img
                    className="py-2"
                    src={
                      formik.values.profile_photo_path === null
                        ? avatar
                        : `${import.meta.env.VITE_FILE_URL}${formik.values.profile_photo_path
                        }`

                    }
                    width="80px"
                    height="80px"
                    alt=""
                  />
                )}

                <div className="my-3 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-user btn-block btn-sm"
                  >
                    Update Profile
                  </button>

                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
