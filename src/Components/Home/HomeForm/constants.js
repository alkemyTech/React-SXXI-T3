import * as Yup from "yup";
import {requiredMessage} from "../../../utils/validation/constants";

export const validationSchema = Yup.object({
    welcomeText: Yup.string()
        .min(20, 'El texto de bienvenida debe tener al menos 20 caracteres')
        .required(requiredMessage + "el texto de bienvenida"),
    slides: Yup.array()
        .min(3, 'No puede seleccionar menos de 3 slides')
        .max(3, 'No puede seleccionar más de 3 slides')
        .required("Por favor, seleccionar los slides")
})

export const initialValues = {
    welcomeText: "",
    slides: []
}