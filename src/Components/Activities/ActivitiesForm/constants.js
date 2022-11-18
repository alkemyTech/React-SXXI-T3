import * as Yup from "yup";
import {imgRegExp, invalidImageFormatMessage, requiredMessage} from "../../../utils/validation/constants";

export const validationSchema = Yup.object().shape({
    name: Yup.string().required(requiredMessage + "el nombre"),
    image: Yup
        .string()
        .matches(imgRegExp, {
            message: invalidImageFormatMessage,
            excludeEmptyString: true,
        })
        .required(requiredMessage + "la imagen"),
    description: Yup.string(),
});

export const initialValues = {
    name: "",
    image: "",
    description: "",
};