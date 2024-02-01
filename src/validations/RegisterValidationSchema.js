import * as Yup from 'yup'

const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required("First Name is required"),
    surname: Yup.string().required("Last Name is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
    username: Yup.string().required("Username is required"),
});

export default registerValidationSchema