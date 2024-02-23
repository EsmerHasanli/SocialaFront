import React, { useContext } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Checkbox, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import LoginValidationSchema from "../../../validations/LoginValidationSchema";

const LoginForm = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
      isPersistence: false,
    },
    validationSchema: LoginValidationSchema,
    onSubmit: async (values, actions) => {
      console.log("Form submitted", values);
      const formData = new FormData();
      formData.append("usernameOrEmail", values.usernameOrEmail);
      formData.append("password", values.password);
      formData.append("isPersistence", values.isPersistence);
      const username = await store.login(formData);
      if(username){
        navigate(`/users/${username}`)
      }

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

        <form onSubmit={formik.handleSubmit}>
          <div className="usernameOrEmail">
            <label htmlFor="usernameOrEmail">Username or Email address</label>
            <Input
              id="usernameOrEmail"
              name="usernameOrEmail"
              placeholder="username or email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              autoComplete='off'
            />
            {formik.touched.usernameOrEmail && formik.errors.usernameOrEmail ? (
              <div className="error">{formik.errors.usernameOrEmail}</div>
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
              autoComplete='off'
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="checkboxWrapper">
            <Checkbox id="isPersistence" name="isPersistence" value={formik.values.isPersistence} onChange={formik.handleChange}>Remember me</Checkbox>
            <Link to="/forget-password">Forgot Password</Link>
          </div>

          <button className="submit" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
};

export default observer(LoginForm)