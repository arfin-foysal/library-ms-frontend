import React from "react";
import Modal from "react-bootstrap/Modal";
import { useUpdatePasswordMutation } from "../../../../services/authApi";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const PasswordUpdateModal = ({ handleClose, show, clickValue, paramId }) => {
  const [updatePassword, res] = useUpdatePasswordMutation();

  const formik = useFormik({
    initialValues: {
      new_password: "",
    },
    onSubmit: async (values,{resetForm}) => {
      try {
        const result = await updatePassword({
          user_id: paramId,
          new_password: values.new_password,
        }).unwrap();

        if (result.status) {
          resetForm();
          handleClose();
        }

        toast.success(result.message);
      } catch (error) {
        toast.error(error.data.message);
      }
    },
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton className="bg-warning">
          <Modal.Title className="fs-6">
        {clickValue}
          </Modal.Title>
        </Modal.Header >
        <Modal.Body>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  name="new_password"
                  onChange={formik.handleChange}
                  value={formik.values.new_password}
                />
              </div>
              <Modal.Footer>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-warning">
                  Update Password
                </button>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PasswordUpdateModal;
