import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, Upload, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import registerValidationSchema from "../../../validations/RegisterValidationSchema";
import { registerUser } from "../../../services/api/httpsrequests";

const RegisterForm = () => {
  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        // formik.setFieldValue("photo", info.file.response.url);
      }
      if (info.file.status === "done") {
        // formik.setFieldValue("photo", info.file.response.url);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      password: "",
      confirmPassword: "",
      username: "",
      photo:""
    },
    // validationSchema: registerValidationSchema,
    onSubmit: async (values, actions) => {
      console.log("Form submitted", values);
      await registerUser(values)
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
              <label htmlFor="name">First Name</label>
              <Input
                id="name"
                name="name"
                placeholder="First Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="surname">
              <label htmlFor="surname">Last Name</label>
              <Input
                id="surname"
                name="surname"
                placeholder="Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.surname}
              />
              {formik.touched.surname && formik.errors.surname ? (
                <div className="error">{formik.errors.surname}</div>
              ) : null}
            </div>
          </div>

          <div className="passwordWrapper">
            <div className="password">
              <label htmlFor="password">Password</label>
              <Input.Password
                id="password"
                name="password"
                placeholder="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
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
              {/* <Upload {...props} id="photo" name="photo" value={formik.values.photo} >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload> */}
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
