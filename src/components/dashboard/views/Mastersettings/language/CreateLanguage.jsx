import { useFormik } from "formik";
import React from "react";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { useLanguageCreateOrUpdateMutation } from "../../../../../services/commonApi";

const CreateLanguage = ({ handleClose }) => {
  const [languageCreateOrUpdate, res] = useLanguageCreateOrUpdateMutation();


  const formik = useFormik({
    initialValues: {
      name: "",
      is_active: false,
    },

    onSubmit: async (values, { resetForm }) => {
      let formData = new FormData();
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
          <div className="form-group row col-12 ">
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

         

          <div className="form-group row col-12 my-2 ">
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

export default CreateLanguage;
