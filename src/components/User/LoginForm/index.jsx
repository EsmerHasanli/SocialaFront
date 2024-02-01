import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Checkbox, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      isRemembered: false
    },
    onSubmit: async (values, actions) => {
      console.log("Form submitted", values);
      // actions.resetForm()
    },
  });

  return (
    <section className="loginForm">
      <img
        src="https://demo.foxthemes.net/socialite-v3.0/assets/images/logo.png"
        alt=""
      />

      <div className="wrappper">
        <h1>Sign in to your account</h1>
        <p>
          If you haven’t signed up yet,{" "}
          <Link to="/register">Register here!</Link>
        </p>

        <form>
          <div className="email">
            <label htmlFor="email">Email address</label>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>

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

            <div className="checkboxWrapper">
              <Checkbox onChange={formik.handleChange}>Remember me</Checkbox>
                <a href="#">Forgot Password</a>
            </div>

            <button className="submit" type="submit">Sign In</button>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
