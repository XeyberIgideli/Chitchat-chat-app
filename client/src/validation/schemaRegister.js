import Yup from "./Validate"


export const schemaRegister = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    fullName: Yup.string().required(),
    password: Yup.string().required()
})