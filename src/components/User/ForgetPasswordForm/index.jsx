import { Divider } from "@mui/material";
import { Input } from "antd";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";

const index = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    // validationSchema:
    onSubmit: async (values, actions) => {
      console.log(values);
    },
  });

  return (
    <div className="wrapper">
      <h3>Trouble logging in?</h3>
      <p>
        Enter your email and we'll send you a link to get back into your
        account.
      </p>
      <form>
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
        <button>Send login link</button>
      </form>


      <div className="link-wrapper">
        <Link to="/register">Create new account</Link>
        <p class="divider">or</p>
        <Link to='/login'>Back to login</Link>
      </div>

    </div>
  );
};

export default index;
