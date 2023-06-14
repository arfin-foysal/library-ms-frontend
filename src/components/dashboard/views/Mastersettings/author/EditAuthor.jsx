import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import avater from "../../../../../assets/images/image_preview.png";
import { useAuthorCreateOrUpdateMutation } from "../../../../../services/authorApi";
const EditAuthor = ({ handleClose, param }) => {
  const [authorCreateOrUpdate, res] = useAuthorCreateOrUpdateMutation();
  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: param?.name,
      email: param?.email,
      mobile: param?.mobile,
      photo: param?.photo,
      contact: param?.contact,
      address1: param?.address1,
      address2: param?.address2,
      bio: param?.bio,
      is_show: param?.is_show,
      is_active: param?.is_active,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("id", param?.id);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("photo", values.photo);
      formData.append("contact", values.contact);
      formData.append("address1", values.address1);
      formData.append("address2", values.address2);
      formData.append("bio", values.bio);
      formData.append("is_show", values.is_show);
      formData.append("is_active", values.is_active);
      resetForm();

      try {
        const result = await authorCreateOrUpdate(formData).unwrap();
        toast.success(result.message);
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });
  if (res.isSuccess) {
    handleClose();
  }

  return (
    <div>
      <form
        className="form-sample"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className="row">
          <div className="form-group row col-6 my-1">
            <label className="col-3 col-form-label">Name</label>
            <div className="col-9">
              <input
                placeholder="Enter Name"
                type="text"
                className="form-control"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
              />
            </div>
          </div>

          <div className="form-group row col-6 my-1">
            <label className="col-3 col-form-label">Email</label>
            <div className="col-9">
              <input
                placeholder="Enter Email"
                type="email"
                className="form-control"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
          </div>

          <div className="form-group row col-6 my-1">
            <label className="col-3 col-form-label">Phone No:</label>
            <div className="col-9">
              <input
                placeholder="Enter Phone No:"
                type="number"
                className="form-control"
                name="mobile"
                onChange={formik.handleChange}
                value={formik.values.mobile}
                required
              />
            </div>
          </div>

          <div className="form-group row col-6 my-1">
            <label className="col-3 col-form-label">Contact Person</label>
            <div className="col-9">
              <input
                placeholder="Enter Contact Person"
                type="text"
                className="form-control"
                name="contact"
                onChange={formik.handleChange}
                value={formik.values.contact}
                required
              />
            </div>
          </div>

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Present Address</label>
            <div className="col-12">
              <input
                placeholder="Enter Present Address"
                type="text"
                className="form-control"
                name="address1"
                onChange={formik.handleChange}
                value={formik.values.address1}
                required
              />
            </div>
          </div>

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Parmanent Address</label>
            <div className="col-12">
              <input
                placeholder="Enter Parmanent Address"
                type="text"
                className="form-control"
                name="address2"
                onChange={formik.handleChange}
                value={formik.values.address2}
                required
              />
            </div>
          </div>

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Bio</label>
            <div className="col-12">
              <textarea
                placeholder="Enter Bio"
                type="text"
                className="form-control"
                name="bio"
                onChange={formik.handleChange}
                value={formik.values.bio}
                required
              />
            </div>
          </div>

          <div className="form-group row col-6 my-1">
            <label className="col-12 col-form-label">Photo</label>
            <div className="col-12">
              <input
                className="form-control"
                name="photo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  formik.setFieldValue("photo", e.currentTarget.files[0]);
                  handelImage(e);
                }}
              />
            </div>
          </div>

          <div className="form-group row col-12 my-1">
            <label className="col-3 col-form-label">Is Show</label>
            <div className="col-9">
              <div class="form-check form-switch mt-2">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Show"
                  name="is_show"
                  onChange={formik.handleChange}
                  value={formik.values.is_show}
                  checked={formik.values.is_show}
                />
              </div>
            </div>
          </div>

          <div className="form-group row col-12 my-1">
            <label className="col-3 col-form-label">Is Active</label>
            <div className="col-9">
              <div class="form-check form-switch mt-2">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Active"
                  name="is_active"
                  onChange={formik.handleChange}
                  value={formik.values.is_active}
                  checked={formik.values.is_active}
                />
              </div>
            </div>
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
                formik.values.photo === null
                  ? avater
                  : `${import.meta.env.VITE_FILE_URL}${formik.values.photo}`
              }
              width="80px"
              height="80px"
              alt=""
            />
          )}
        </div>
        <Modal.Footer>
          <div className=" d-flex">
            <button type="submit" className="btn btn-success me-2">
              Submit
            </button>

            <button
              type="button"
              className="btn btn-dark"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default EditAuthor;
