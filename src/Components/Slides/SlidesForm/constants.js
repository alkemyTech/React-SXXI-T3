import * as Yup from "yup";
import {imgRegExp, invalidImageFormatMessage, requiredMessage, numRegExp} from "../../../utils/validation/constants";

export const validationSchema = Yup.object().shape({
    name: Yup
        .string()
        .min(4, "El título debe tener al menos 4 caracteres")
        .required(requiredMessage + "el título"),
    image: Yup
        .string()
        .matches(imgRegExp, {
            message: invalidImageFormatMessage,
            excludeEmptyString: true,
        })
        .required(requiredMessage + "la imagen"),
    description: Yup.string()
        .required(requiredMessage + "la descripción"),
        order: Yup
            .string()
            .trim()
            .matches(numRegExp, 'El orden debe ser un número')
            .required(requiredMessage + "el número de orden")
    });

export const initialValues = {
    name: '',
    description: '',
    image: '',
    order: ''
};