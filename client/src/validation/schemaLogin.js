import Yup from "./Validate"


export const schemaLogin = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required()
})