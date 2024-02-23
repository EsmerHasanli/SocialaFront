import * as Yup from 'yup';

const SettingsInfoValidationSchema = Yup.object({
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
 
    bio:  Yup.string().max(80, 'Bio should be at most 80 characters long'),

    email: Yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Its not valid email address").email("Its not valid email address").required("Email address is required"),

})

export default SettingsInfoValidationSchema;