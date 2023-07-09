import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useGetAuthorListQuery } from "../../../../../services/authorApi";
import Select from "react-select";
import { useGetPublisharListQuery } from "../../../../../services/publisherApi";
import { useGetLanguageListQuery } from "../../../../../services/commonApi";
import avater from "../../../../../assets/images/image_preview.png";
import {
  useGetCategoryListQuery,
  useGetSubCategoryListByCategoryQuery,
  useGetThirdSubCategoryListbySubcategotyIdQuery,
} from "../../../../../services/categoryApi";
import { useBookItemCreateOrUpdateMutation } from "../../../../../services/bookItemApi";
const EditBookItem = ({ handleClose, param }) => {
  const [categoryId, setCategoryId] = useState(param?.category_id);
  const [subCategoryId, setSubCategoryId] = useState(param?.sub_category_id);
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

  const [previewImage, setPreviewImage] = useState();
  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  const focusOne = (id, name) => {
    setCategoryId(id);
    if (name === "category_id") {
      setSubCategoryId(null);
      formik.setFieldValue("sub_category_id", null);
      formik.setFieldValue("third_category_id", null);
    }
  };

  const focusTwo = (id, name) => {
    setSubCategoryId(id);
    if (name === "sub_category_id") {
      formik.setFieldValue("third_category_id", null);
    }
  };




  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: param?.title,
      isbn: param?.isbn,
      price: param?.price,
      photo: param?.photo && param?.photo,
      edition: param?.edition,
      number_of_page: param?.number_of_page,
      summary: param?.summary,
      video_url: param?.video_url,
      brochure: param?.brochure,
      publish_status: param?.publish_status,
      publisher_id: param?.publisher_id,
      language_id: param?.language_id,
      country_id: param?.country_id,
      category_id: param?.category_id,
      sub_category_id: param?.sub_category_id,
      third_category_id: param?.third_category_id,
      item_type: param?.item_type,
      is_free: param?.is_free,
      is_show: param?.is_show,
      is_active: param?.is_active,
      publish_date: param?.publish_date,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("id", param?.id);
      formData.append("title", values.title);
      formData.append("isbn", values.isbn);
      formData.append("price", values.price);
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
      formData.append("is_free", values.is_free);
      formData.append("item_type", values.item_type);
      formData.append("is_active", values.is_active);
      formData.append("publish_date", values.publish_date);

      if (authorId.length <= 0) {
        const arr = [];
        param?.authors.map((item) => {
          arr.push(item.id);
        });
        const authorArr = JSON.stringify(arr);
        formData.append("author_id", authorArr);
      } else {
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
                <label className="col-12 col-form-label">Title <span className=" text-danger">*</span></label>
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
              <div className="col-12">
                <label className="col-12 col-form-label">Price </label>
                <div className="col-12">
                  <input
                    placeholder="Enter item price"
                    type="number"
                    className="form-control"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}

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

                  />
                </div>
              </div>
              <div className="col-6">
                <label className="col-12 col-form-label">Item Type <span className=" text-danger">*</span></label>
                <div className="col-12">
                  <select
                    className="form-control"
                    name="item_type"
                    onChange={formik.handleChange}
                    value={formik.values.item_type}
                    required

                  >
                 <option value="" disabled selected hidden>--Select--</option>
                    <option value="physical">Physical</option>
                    <option value="virtual">Virtual</option>
                  </select>
                </div>
              </div>
              <div className="col-6">
                <label className="col-12 col-form-label">Is Free</label>
                <div className="col-12">
                  <select
                    className="form-control"
                    name="is_free"
                    onChange={formik.handleChange}
                    value={formik.values.is_free}

                  >
                  <option value="" disabled selected hidden>--Select--</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              <div className="col-6">
                <label className="col-12 col-form-label">No of page</label>
                <div className="col-12">
                  <input
                    placeholder="Enter Edition"
                    type="number"
                    className="form-control"
                    name="number_of_page"
                    onChange={formik.handleChange}
                    value={formik.values.number_of_page}

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
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
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
                <label className="col-12 col-form-label">Image <span className=" text-danger">*</span></label>
                <div className="col-12">
                  <input
                    required
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

              <div className="pt-4">
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
                        : `${import.meta.env.VITE_FILE_URL}${formik.values.photo
                        }`
                    }
                    width="80px"
                    height="80px"
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
          <div className="col-4 border border-2 p-2">
            <div className="row">
              <div className="col-12">
                <label className="col-12 col-form-label">Publish Date</label>
                <input
                  type="date"
                  name="publish_date"
                  className="form-control"
                  onChange={formik.handleChange}
                  // value={formik.values.publish_date}
                  defaultValue={param?.publish_date?.slice(0, 10)}
                />


              </div>
              <div className="col-12">
                <label className="col-12 col-form-label">Author <span className=" text-danger">*</span></label>
                <Select
                  defaultValue={param?.authors}
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

                >
                <option value="" disabled selected hidden>--Select--</option>

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
                 
                >
             <option value="" disabled selected hidden>--Select--</option>

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

                >
                <option value="" disabled selected hidden>--Select--</option>

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

                >
                 <option value="" disabled selected hidden>--Select--</option>

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
                    focusTwo(e.target.value, e.target.name);
                  }}
                  value={formik.values.sub_category_id}

                >
                  <option value="" disabled selected hidden>--Select--</option>

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
               
                >
                  <option value="" disabled selected hidden>--Select--</option>

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

                >
                  <option value="" disabled selected hidden>--Select--</option>
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


            <button type="submit" className="btn btn-success " data-dismiss="modal">
              Submit
            </button>

          </div>
        </Modal.Footer>
      </form>
    </div>
  );
};

export default EditBookItem;
