import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import registerValidationSchema from "../../../validations/RegisterValidationSchema";
// import { registerUser } from "../../../services/api/httpsrequests";

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
    // validationSchema: registerValidationSchema,
    onSubmit: async (values, actions) => {
      const formData = new FormData();
      formData.append("photo", values.file)
      formData.append("name", values.name)
      formData.append("surname", values.surname)
      formData.append("username", values.username)
      formData.append("password", values.password)
      // const result = await registerUser(formData)
      
      actions.resetForm()
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
                placeholder="Password"
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
                placeholder="Enter your Username"
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
              <input className="fileUpload" id="photo" name="photo" value={formik.values.photo} onChange={(e) => formik.setFieldValue('file', e.currentTarget.files[0])} type="file" />
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