import * as Yup from 'yup'

const LoginValidationSchema = Yup.object({
    usernameOrEmail: Yup.string().required('Username or Email is required'), 
    password: Yup.string().required('Password is required'),
})
export default LoginValidationSchema