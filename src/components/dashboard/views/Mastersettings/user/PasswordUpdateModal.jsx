import React from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../../../../../services/userApi";

const PasswordUpdateModal = ({ handleClose, show, paramId }) => {
  const [resetPassword] = useResetPasswordMutation();

  const formik = useFormik({
    initialValues: {
      new_password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await resetPassword({
          id: paramId,
          password: values.new_password,
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
            Reset Password
          </Modal.Title>
        </Modal.Header >
        <Modal.Body>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group ">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  name="new_password"
                  onChange={formik.handleChange}
                  value={formik.values.new_password}
                  required
                />
              </div>
              <Modal.Footer className=" border-0">
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
