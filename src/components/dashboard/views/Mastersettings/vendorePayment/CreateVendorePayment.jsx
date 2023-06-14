import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetAuthorListQuery } from "../../../../../services/authorApi";
import Select from "react-select";
import { useGetPublisharListQuery } from "../../../../../services/publisherApi";
import { useGetLanguageListQuery } from "../../../../../services/commonApi";
import {
  useGetCategoryListQuery,
  useGetSubCategoryListByCategoryQuery,
  useGetThirdSubCategoryListbySubcategotyIdQuery,
} from "../../../../../services/categoryApi";
import { useBookItemCreateOrUpdateMutation } from "../../../../../services/bookItemApi";
const CreateVendorePayment = ({ handleClose }) => {
  const [categoryId, setCategoryId] = useState();
  const [subCategoryId, setSubCategoryId] = useState();
  const [authorId, setAuthorId] = useState([]);

  const [bookItemCreateOrUpdate, res] = useBookItemCreateOrUpdateMutation();
  const publisharRes = useGetPublisharListQuery();
  const langRes = useGetLanguageListQuery();
  const countryRes = useGetLanguageListQuery();
  const categoryRes = useGetCategoryListQuery();
  const subcategoryRes = useGetSubCategoryListByCategoryQuery(categoryId);
  const thirdSubCateRes =
  useGetThirdSubCategoryListbySubcategotyIdQuery(subCategoryId);
  const authorRes = useGetAuthorListQuery();
  const focusOne = (id, name) => {
    setCategoryId(id);
    if (name === "category_id") {
      setSubCategoryId(null);
    }
  };

  const [previewImage, setPreviewImage] = useState();

  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      isbn: "",
      photo: "",
      edition: "",
      number_of_page: "",
      summary: "",
      video_url: "",
      brochure: "",
      publish_status: "",
      publisher_id: "",
      language_id: "",
      country_id: "",
      category_id: "",
      sub_category_id: "",
      third_category_id: "",
      created_by: "",
      author_id: [],
      is_show: false,
      is_active: false,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("title", values.title);
      formData.append("isbn", values.isbn);
      formData.append("photo", values.photo);
      formData.append("edition", values.edition);
      formData.append("number_of_page", values.number_of_page);
      formData.append("summary", values.summary);
      formData.append("video_url", values.video_url);
      formData.append("brochure", values.brochure);
      formData.append("publish_status", values.publish_status);
      formData.append("publisher_id", values.publisher_id);
      formData.append("language_id", values.language_id);
      formData.append("country_id", values.country_id);
      formData.append("category_id", values.category_id);
      formData.append("sub_category_id", values.sub_category_id);
      formData.append("third_category_id", values.third_category_id);
      formData.append("created_by", values.created_by);
      formData.append("is_show", values.is_show);
      formData.append("is_active", values.is_active);

      if (authorId.length <= 0) {
        toast.error("Please select Author");
      }

      if (authorId.length > 0) {
        const arr = [];
        authorId.map((item) => {
          arr.push(item.id);
        });
        const authorArr = JSON.stringify(arr);
        formData.append("author_id", authorArr);
      }





      resetForm();

      try {
        const result = await bookItemCreateOrUpdate(formData).unwrap();
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
          <div className="col-8 border border-2">
            <div className="row">
              <div className="col-12">
                <label className="col-12 col-form-label">Title </label>
                <div className="col-12">
                  <input
                    placeholder="Enter Title"
                    type="text"
                    className="form-control"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <label className="col-12 col-form-label">Isbn </label>
                <div className="col-12">
                  <input
                    placeholder="Enter Isbn"
                    type="text"
                    className="form-control"
                    name="isbn"
                    onChange={formik.handleChange}
                    value={formik.values.isbn}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <label className="col-12 col-form-label">Edition</label>
                <div className="col-12">
                  <input
                    placeholder="Enter Edition"
                    type="text"
                    className="form-control"
                    name="edition"
                    onChange={formik.handleChange}
                    value={formik.values.edition}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <label className="col-12 col-form-label">No of page</label>
                <div className="col-12">
                  <input
                    placeholder="Enter Edition"
                    type="number_of_page"
                    className="form-control"
                    name="number_of_page"
                    onChange={formik.handleChange}
                    value={formik.values.number_of_page}
                    required
                  />
                </div>
              </div>
          
              <div className="col-6">
                <label className="col-12 col-form-label">Video Url</label>
                <div className="col-12">
                  <input
                    placeholder="Enter Video Url"
                    type="text"
                    className="form-control"
                    name="video_url"
                    onChange={formik.handleChange}
                    value={formik.values.video_url}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <label className="col-12 col-form-label">Brochure</label>
                <div className="col-12">
                  <input
                    className="form-control"
                    name="brochure"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      formik.setFieldValue(
                        "brochure",
                        e.currentTarget.files[0]
                      );
                    
                    }}
                  />
                </div>
              </div>
              <div className="col-6">
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
              <div className="col-12">
                <label className="col-12 col-form-label">summary</label>
                <div className="col-12">
                  <textarea
                    placeholder="Enter Summary"
                    type="text"
                    className="form-control"
                    name="summary"
                    onChange={formik.handleChange}
                    value={formik.values.summary}
                    required
                  />
                </div>
              </div>
              <div className="col-12 pt-3">
                <div className="row">
                  <label className="col-6 col-form-label">Is Show</label>
                  <div className="col-4">
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
              </div>

              <div className="col-12 pt-3">
                <div className="row">
                  <label className="col-6 col-form-label">Is Active</label>
                  <div className="col-4">
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

              
        <div className="pt-2">
          <img
            className="py-2"
            src={previewImage}
            width="80px"
            height="80px"
            alt=""
          />
        </div>
            </div>
          </div>
          <div className="col-4 border border-2 p-2">
            <div className="row">
              <div className="col-12">
                <label className="col-12 col-form-label">Author</label>
                <Select
                  isMulti
                  placeholder="Select Author"
                  classNamePrefix="select"
                  onChange={(e) => setAuthorId(e)}
                  getOptionValue={(option) => `${option["id"]}`}
                  getOptionLabel={(option) => `${option["name"]}`}
                  options={authorRes.isSuccess && authorRes.data?.data}
                />
              </div>
              <div className="col-12">
                <label className="col-12 col-form-label">Publisher</label>

                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                  name="publisher_id"
                  onChange={formik.handleChange}
                  value={formik.values.publisher_id}
                  required
                >
                  <option selected>Select Publisher</option>

                  {publisharRes?.data?.data?.map((cate, i) => {
                    return (
                      <option value={cate.id} key={i}>
                        {cate.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-12">
                <label className="col-12 col-form-label">Language</label>

                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                  name="language_id"
                  onChange={formik.handleChange}
                  value={formik.values.language_id}
                  required
                >
                  <option selected>Select Language</option>

                  {langRes?.data?.data?.map((cate, i) => {
                    return (
                      <option value={cate.id} key={i}>
                        {cate.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-12">
                <label className="col-12 col-form-label">Country</label>

                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                  name="country_id"
                  onChange={formik.handleChange}
                  value={formik.values.country_id}
                  required
                >
                  <option selected>Select Country</option>

                  {countryRes?.data?.data?.map((cate, i) => {
                    return (
                      <option value={cate.id} key={i}>
                        {cate.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-12">
                <label className="col-12 col-form-label">Category</label>
                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                  name="category_id"
                  onChange={(e) => {
                    formik.handleChange(e);
                    focusOne(e.target.value, e.target.name);
                  }}
                  value={formik.values.category_id}
                  required
                >
                  <option selected> --select-- </option>

                  {categoryRes?.data?.data?.map((cate, i) => {
                    return (
                      <option value={cate.id} key={i}>
                        {cate.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-12">
                <label className="col-12 col-form-label">Sub Category</label>
                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                  name="sub_category_id"
                  onChange={(e) => {
                    formik.handleChange(e);
                    setSubCategoryId(e.target.value);
                  }}
                  value={formik.values.sub_category_id}
                  required
                >
                  <option selected>--select--</option>

                  {subcategoryRes?.data?.data?.map((cate, i) => {
                    return (
                      <option value={cate.id} key={i}>
                        {cate.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-12">
                <label className="col-12 col-form-label">
                  Third Sub Category
                </label>
                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                  name="third_category_id"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  value={formik.values.third_category_id}
                  required
                >
                  <option selected>--select--</option>

                  {thirdSubCateRes?.data?.data?.map((cate, i) => {
                    return (
                      <option value={cate.id} key={i}>
                        {cate.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-12">
                <label className="col-12 col-form-label">Publish Status</label>
                <select
                  className="form-select form-control"
                  aria-label="Default select example"
                  name="publish_status"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  value={formik.values.publish_status}
                  required
                >
                  <option selected> --select-- </option>
                  <option value="published">Published</option>
                  <option value="unpublished">Unpublished</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <Modal.Footer>
          <div className=" d-flex">
            
              <button className="btn btn-dark me-1" onClick={handleClose}>
                Close
              </button>
           
          
              <button type="submit" className="btn btn-success ">
                Submit
              </button>
         
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default CreateVendorePayment;
