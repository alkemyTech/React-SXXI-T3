import * as Yup from "yup";
import {imgRegExp, invalidImageFormatMessage, requiredMessage} from "../../../utils/validation/constants";

export const validationSchema = Yup.object().shape({
    title: Yup.string() .required(requiredMessage + "el título"),
    image: Yup
        .string()
        .matches(imgRegExp, {
            message: invalidImageFormatMessage,
            excludeEmptyString: true,
        })
        .required(requiredMessage + "la imagen"),
    description: Yup.string().required(requiredMessage + "la descripción"),
    due_date: Yup.string(),
});

export const initialValues = {
    title: "",
    description: "",
    image: "",
    due_date: "",
};