import { Divider } from "@mui/material";
import { Input } from "antd";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../main";

const ForgetPasswordForm = () => {
  const {store} = useContext(Context)

  const formik = useFormik({
    initialValues: {
      email: "",
    },
  
    onSubmit: async (values, actions) => {
      console.log(values);
      const formData = new FormData()
      formData.append("email", values.email)
      await store.resetPassword(formData);

    },
  });

  return (
    <div className="wrapper">
      <h3>Trouble logging in?</h3>
      <p>
        Enter your email and we'll send you a link to get back into your
        account.
      </p>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="email"
          name="email"
          placeholder="example@example.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {/* {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null} */}
        <button type="submit">Send login link</button>
      </form>


      <div className="link-wrapper">
        <Link to="/register">Create new account</Link>
        <p class="divider">or</p>
        <Link to='/login'>Back to login</Link>
      </div>

    </div>
  );
};

export default ForgetPasswordForm;