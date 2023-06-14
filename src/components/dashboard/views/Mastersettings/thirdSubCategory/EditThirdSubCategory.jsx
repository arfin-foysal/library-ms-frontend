import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import avater from "../../../../../assets/images/image_preview.png";
import {  useGetSubCategoryListQuery, useThirdsubCategoryCreateOrUpdateMutation } from "../../../../../services/categoryApi";


const EditThirdSubCategory = ({ handleClose, param }) => {
  const [thirdsubCategoryCreateOrUpdate, res] = useThirdsubCategoryCreateOrUpdateMutation();
  const [previewImage, setPreviewImage] = useState();
  const categoryRes = useGetSubCategoryListQuery();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: param?.name,
      photo: param?.photo,
      sub_category_id: param?.sub_category_id,
      description: param?.description,
      is_active: param?.is_active,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("id", param?.id);
      formData.append("name", values.name);
      formData.append("sub_category_id", values.sub_category_id);
      formData.append("photo", values.photo);
      formData.append("description", values.description);
      formData.append("is_active", values.is_active);
      resetForm();

      try {
        const result = await thirdsubCategoryCreateOrUpdate(formData).unwrap();
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
                name="sub_category_id"
                onChange={formik.handleChange}
                value={formik.values.sub_category_id}
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
            <div className="col-12  ">
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



          <div className="form-group row col-12 my-2">
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

export default EditThirdSubCategory;
