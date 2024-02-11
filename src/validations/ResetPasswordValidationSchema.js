import * as Yup from 'yup'

const ResetPasswordValidationSchema = Yup.object({
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

})

export default ResetPasswordValidationSchema