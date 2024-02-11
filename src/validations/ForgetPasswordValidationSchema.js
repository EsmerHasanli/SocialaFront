import * as Yup from 'yup'

const ForgetPasswordValidationSchema = Yup.object({
    email: Yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Its not valid email address").email("Its not valid email address").required("Email address is required"),
})

export default ForgetPasswordValidationSchema