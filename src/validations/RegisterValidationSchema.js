import * as Yup from "yup";

const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name should be at least 2 characters long")
    .max(50, "Name should be at most 50 characters long")
    .matches(/^[a-zA-Z]+$/, "Invalid characters. Use only letters")
    .required("First Name is required"),

  surname: Yup.string()
    .min(3, "Name should be at least 3 characters long")
    .max(100, "Name should be at most 100 characters long")
    .matches(/^[a-zA-Z]+$/, "Invalid characters. Use only letters")
    .required("Last Name is required"),

  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#. ,?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one digit"
    )
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),

  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Invalid characters. Use only letters and numbers"
    )
    .min(5, "Username should be at least 5 characters long!")
    .max(20, "Username should be at most 20 characters long!")
    .required("Username is required"),

    photo: Yup.mixed()
    .test('fileSize', 'File size must be less than 2MB', (value) => {
      if (!value) return true; 
      return value.size <= 2 * 1024 * 1024;
    })
    .test('fileType', 'Invalid file type. Only images are allowed', (value) => {
      if (!value) return true; 
      return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
    })
    .nullable(),
});

export default registerValidationSchema;
