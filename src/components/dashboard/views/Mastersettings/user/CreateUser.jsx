import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUserCreateOrUpdateMutation } from "../../../../../services/userApi";

const CreateUser = ({ handleClose }) => {
  const [userCreateOrUpdate, res] = useUserCreateOrUpdateMutation();
  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      profile_photo_path: "",
      phone: "",
      user_role: "",
      password: "",
      is_active: false,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("profile_photo_path", values.profile_photo_path);
      formData.append("phone", values.phone);
      formData.append("user_role", values.user_role);
      formData.append("password", values.password);
      formData.append("is_active", values.is_active);

      resetForm();

      try {
        const result = await userCreateOrUpdate(formData).unwrap();
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
          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Name</label>
            <div className="col-12">
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
          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Email</label>
            <div className="col-12">
              <input
                placeholder="Enter Email"
                type="email"
                className="form-control"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
              />
            </div>
          </div>

          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Phone</label>
            <div className="col-12">
              <input
                placeholder="Enter Phone"
                type="number"
                className="form-control"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                required
              />
            </div>
          </div>
          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Password</label>
            <div className="col-12">
              <input
                placeholder="Enter password"
                type="password"
                className="form-control"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                required
              />
            </div>
          </div>
    <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">User Role</label>
            <div className="col-12">
              <select
                className="form-control"
                name="user_role"
                onChange={formik.handleChange}
                value={formik.values.user_role}
                required
              >
                <option value="">Select User Role</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
                <option value="general_user">General User</option>
                <option value="librarian">Librarian</option>
              </select>
            </div>
          </div>
     

          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Photo</label>
            <div className="col-12">
              <input
                className="form-control"
                name="profile_photo_path"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  formik.setFieldValue("profile_photo_path", e.currentTarget.files[0]);
                  handelImage(e);
                }}
              />
            </div>
          </div>



          <div className="form-group row col-12 my-2 ">
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
        <div>
          <img
            className="py-2"
            src={previewImage}
            width="80px"
            height="80px"
            alt=""
          />
        </div>
        <Modal.Footer>
          <div className=" d-flex">
            <div>
              <button className="btn btn-dark" onClick={handleClose}>
                Close
              </button>
            </div>
            <div className="mx-5">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default CreateUser;
