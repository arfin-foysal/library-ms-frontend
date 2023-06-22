import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import avater from "../../../../../assets/images/image_preview.png";
import { useVendorCreateOrUpdateMutation } from "../../../../../services/vendorApi";
const EditVendor = ({ handleClose, param }) => {
  const [vendorCreateOrUpdate, res] = useVendorCreateOrUpdateMutation();
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
      contact_person: param?.contact_person,
      contact_person_mobile: param?.contact_person_mobile,
      primary_supply_products: param?.primary_supply_products,
      office_address: param?.office_address,
      warehouse_address: param?.warehouse_address,
      is_active: param?.is_active,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("id", param?.id);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("photo", values.photo);
      formData.append("contact_person", values.contact_person);
      formData.append("contact_person_mobile", values.contact_person_mobile);
      formData.append("primary_supply_products", values.primary_supply_products);
      formData.append("office_address", values.office_address);
      formData.append("warehouse_address", values.warehouse_address);
      formData.append("is_active", values.is_active);
      resetForm();

      try {
        const result = await vendorCreateOrUpdate(formData).unwrap();
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
                required
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
              name="contact_person"
              onChange={formik.handleChange}
              value={formik.values.contact_person}
              required
            />
          </div>
        </div>
        <div className="form-group row col-6 my-1">
          <label className="col-3 col-form-label">
            Contact Person Mobile
          </label>
          <div className="col-9">
            <input
              placeholder="Enter Contact Person"
              type="number"
              className="form-control"
              name="contact_person_mobile"
              onChange={formik.handleChange}
              value={formik.values.contact_person_mobile}
              required
            />
          </div>
        </div>
        <div className="form-group row col-6 my-1">
          <label className="col-3 col-form-label">
            Primary Supply Products
          </label>
          <div className="col-9">
            <input
              placeholder="Enter Contact Person"
              type="text"
              className="form-control"
              name="primary_supply_products"
              onChange={formik.handleChange}
              value={formik.values.primary_supply_products}
              required
            />
          </div>
        </div>

        <div className="form-group row col-12 my-1">
          <label className="col-12 col-form-label">Office Address</label>
          <div className="col-12">
            <input
              placeholder="Enter Office Address"
              type="text"
              className="form-control"
              name="office_address"
              onChange={formik.handleChange}
              value={formik.values.office_address}
              required
            />
          </div>
        </div>

        <div className="form-group row col-12 my-1">
          <label className="col-12 col-form-label">Warehouse Address</label>
          <div className="col-12">
            <input
              placeholder="Enter Warehouse Address"
              type="text"
              className="form-control"
              name="warehouse_address"
              onChange={formik.handleChange}
              value={formik.values.warehouse_address}
              required
            />
          </div>
        </div>

        <div className="form-group row col-6 my-3 ">
          <label className="col-6 col-form-label">Photo</label>
          <div className="col-6">
              <input
          
              className="form-control "
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
        <div className="form-group row col-6 my-3">
          <label className="col-6 col-form-label">Is Active</label>
          <div className="col-6">
            <div className="form-check form-switch mt-2">
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

export default EditVendor;
