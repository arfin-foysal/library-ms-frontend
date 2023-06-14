import { useFormik } from "formik";
import React from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { useLanguageCreateOrUpdateMutation } from "../../../../../services/commonApi";
const EditLanguage = ({ handleClose, param }) => {
  const [languageCreateOrUpdate, res] = useLanguageCreateOrUpdateMutation();



  


  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: param?.name,
      is_active: param?.is_active,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
      formData.append("id", param?.id);
      formData.append("name", values.name);
      formData.append("is_active", values.is_active);
      resetForm();

      try {
        const result = await languageCreateOrUpdate(formData).unwrap();
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

   



          <div className="form-group row col-12 my-2">
            <label className="col-4 col-form-label">Is Active</label>
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

export default EditLanguage;
