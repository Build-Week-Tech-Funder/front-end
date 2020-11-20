import * as yup from 'yup'

const registerSchema = yup.object().shape({
    username : yup.string().required("Username is required"),
    password : yup.string().required("Password is required"),
    role : yup.number().required("role is required")
});

export default registerSchema;