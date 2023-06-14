import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useGetCategoryListQuery,
  useSubCategoryCreateOrUpdateMutation,
} from "../../../../../services/categoryApi";

const CreateSubCategory = ({ handleClose }) => {
  const [subCategoryCreateOrUpdate, res] =
    useSubCategoryCreateOrUpdateMutation();
  const categoryRes = useGetCategoryListQuery();

  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      photo: "",
      category_id: "",
      is_active: false,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("photo", values.photo);
      formData.append("category_id", values.category_id);
      formData.append("is_active", values.is_active);
      resetForm();

      try {
        const result = await subCategoryCreateOrUpdate(formData).unwrap();
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
            <label className="col-12 col-form-label">Category</label>
            <div className="col-12">
              <select
                className="form-select form-control"
                aria-label="Default select example"
                name="category_id"
                onChange={formik.handleChange}
                value={formik.values.category_id}
                required
              >
                <option selected>Select Category</option>

                {categoryRes?.data?.data?.map((cate, i) => {
                  return (
                    <option value={cate.id} key={i}>
                      {cate.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="form-group row col-12 my-1">
            <label className="col-12 col-form-label">Description</label>
            <div className="col-12">
              <textarea
                placeholder="Enter description"
                type="text"
                className="form-control"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                required
              />
            </div>
          </div>

          <div className="form-group row col-12 my-1">
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
        <div className="mx-4">
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
            <button className="btn btn-dark me-2" onClick={handleClose}>
              Close
            </button>

            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default CreateSubCategory;
