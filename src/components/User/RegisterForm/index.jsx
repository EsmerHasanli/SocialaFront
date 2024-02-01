import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, Upload, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import registerValidationSchema from "../../../validations/RegisterValidationSchema";
import { registerUser } from "../../../services/api/httpsrequests";

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      Name: "",
      Surname: "",
      Password: "",
      confirmPassword: "",
      username: "",
      photo:""
    },
    // validationSchema: registerValidationSchema,
    onSubmit: async (values, actions) => {
      console.log("Form submitted", values);
      // await registerUser(values)
      // actions.resetForm()
    },
  });

  return (
    <div className="registerForm">
      <img
        src="https://demo.foxthemes.net/socialite-v3.0/assets/images/logo.png"
        alt=""
      />

      <div className="wrapper">
        <h1>Sign up to get started</h1>
        <p>
          If you already have an account, <Link to="/login">Login here!</Link>
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="nameWrapper">
            <div className="name">
              <label htmlFor="Name">First Name</label>
              <Input
                id="Name"
                name="Name"
                placeholder="First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Name}
              />
              {formik.touched.Name && formik.errors.Name ? (
                <div className="error">{formik.errors.Name}</div>
              ) : null}
            </div>

            <div className="Surname">
              <label htmlFor="Surname">Last Name</label>
              <Input
                id="Surname"
                name="Surname"
                placeholder="Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Surname}
              />
              {formik.touched.Surname && formik.errors.Surname ? (
                <div className="error">{formik.errors.Surname}</div>
              ) : null}
            </div>
          </div>

          <div className="passwordWrapper">
            <div className="password">
              <label htmlFor="Password">Password</label>
              <Input.Password
                id="Password"
                name="Password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Password}
              />
              {formik.touched.Password && formik.errors.Password ? (
                <div className="error">{formik.errors.Password}</div>
              ) : null}
            </div>

            <div className="confirm-password">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Input.Password
                id="confirmPassword"
                name="confirmPassword"
                placeholder="confirm password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="error">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
          </div>

          <div className="userInfoWrapper">
            <div className="username">
              <label htmlFor="username">Username</label>
              <Input
                placeholder="Enter your username"
                prefix={<UserOutlined className="site-form-item-icon" />}
                id="username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="error">{formik.errors.username}</div>
              ) : null}
            </div>

            <div className="image">
              <label htmlFor="photo">Profile Picture</label>
              <input id="photo" name="photo" value={formik.values.photo} onChange={formik.handleChange} type="file" />
            </div>
          </div>

          <button className="submit" type="submit">
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
