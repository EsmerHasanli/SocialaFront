import React from "react";
import "./index.scss";
import { useFormik } from "formik";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
        
      </div>
    </section>
  );
};

export default LoginForm;
