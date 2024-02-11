import { Divider } from "@mui/material";
import { Input } from "antd";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../main";
import ResetPasswordValidationSchema from "../../../validations/ResetPasswordValidationSchema";

const ResetPasswordForm = () => {
  const { store } = useContext(Context);
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordValidationSchema,
    onSubmit: async (values, actions) => {
      console.log(values);
      const formData = new FormData();
      formData.append("password", values.password);
      formData.append("token", queryParams.get("token"));
      formData.append("email", queryParams.get("email"));

      const res = await store.setNewPassword(formData);

      if (res) {
        navigate("/login");
      }
    },
  });

  return (
    <div className="wrapper">
      <h3>Password Reset</h3>
      <p>Enter your new password and we'll navigate you to login.</p>
      <form onSubmit={formik.handleSubmit}>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="New password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
        <Input
        style={{ marginTop: "16px" }}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="error">{formik.errors.confirmPassword}</div>
        ) : null}
        <button type="submit">Confirm new password</button>
      </form>

      <div className="link-wrapper">
        <Link to="/login">Back to login</Link>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
