import * as Yup from "yup";
import {imgRegExp, invalidImageFormatMessage, requiredMessage} from "../../../utils/validation/constants";

export const validationSchema = Yup.object().shape({
    name: Yup.string().min(4, 'El nombre debe tener al menos 4 caracteres').required(requiredMessage + "el nombre"),
    image: Yup
        .string()
        .matches(imgRegExp, {
            message: invalidImageFormatMessage,
            excludeEmptyString: true,
        })
        .required(requiredMessage + "la imagen"),
    description: Yup.string().required(requiredMessage + "la descripción"),
});

export const initialValues = {
    name: '',
    description: '',
    image: ''
};