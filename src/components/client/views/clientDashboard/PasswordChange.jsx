import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { usePasswordChangeMutation } from "../../../../services/clientAuthApi";
import * as Yup from "yup";

const PasswordChange = ({ handleClose, show, paramId }) => {
  const [passwordChange, res] = usePasswordChangeMutation();


  const formik = useFormik({

    validationSchema: Yup.object({
      old_password: Yup.string().required("Required"),
      new_password: Yup.string().required("Required")

        .min(6, 'Password is too short - should be 86chars minimum.').matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number"
        ),

      confirm_password: Yup.string().required("Required").oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    }),

    initialValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",

    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await passwordChange({
          old_password: values.old_password,
          new_password: values.new_password,
          confirm_password: values.confirm_password,

        }).unwrap();

        if (result.status) {
          resetForm();
          toast.success(result.message);
        }

      } catch (error) {
        toast.error(error.data.message);
      }
    },
  });

  return (
    <>
      <h4>Change Password</h4>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-8">
              <div className="form-group my-2">
                <label htmlFor="password">Old Password</label>
                <input
                  type="password"

                  id="password"
                  placeholder="Enter Old Password"
                  name="old_password"
                  onChange={formik.handleChange}
                  value={formik.values.old_password}
                  required
                  onBlur={formik.handleBlur}
                  className={formik.touched.old_password && formik.errors.old_password ? "form-control is-invalid" : "form-control shadow"}

                />
                {formik.touched.old_password && formik.errors.old_password ? (
                  <div className="invalid-feedback">{formik.errors.old_password}</div>
                ) : null}
              </div>
              <div className="form-group my-2">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"

                  id="password"
                  placeholder="Enter New Password"
                  name="new_password"
                  onChange={formik.handleChange}
                  value={formik.values.new_password}
                  required
                  onBlur={formik.handleBlur}
                  className={formik.touched.new_password && formik.errors.new_password ? "form-control is-invalid" : "form-control shadow"}

                />
                {formik.touched.new_password && formik.errors.new_password ? (
                  <div className="invalid-feedback">{formik.errors.new_password}</div>
                ) : null}

              </div>
              <div className="form-group my-2">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"

                  id="password"
                  placeholder="Enter Confirm Password"
                  name="confirm_password"
                  onChange={formik.handleChange}
                  value={formik.values.confirm_password}
                  required
                  onBlur={formik.handleBlur}
                  className={formik.touched.confirm_password && formik.errors.confirm_password ? "form-control is-invalid" : "form-control shadow"}

                />
                {formik.touched.confirm_password && formik.errors.confirm_password ? (
                  <div className="invalid-feedback">{formik.errors.confirm_password}</div>
                ) : null}

              </div>


              <button type="submit" className="btn btn-warning">
                Update Password
              </button>
            </div>
            <div className="col-md-4"></div>

          </div>
        </form>
      </div>

    </>
  );
};




export default PasswordChange