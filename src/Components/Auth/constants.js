import * as Yup from "yup";
import {requiredMessage} from "../../utils/validation/constants";

const defaultValidations = {
    email: Yup
        .string()
        .email("Formato de email inválido")
        .required(requiredMessage + "el email"),
    password: Yup
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .matches(
            /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
            "La contraseña debe tener al menos un número, una letra y un símbolo (#?!@$%^&*-)"
        )
        .required(requiredMessage + "la contraseña"),
}

export const loginValidationSchema = Yup.object().shape({
    ...defaultValidations
});

export const registerValidationSchema = Yup.object().shape({
    ...defaultValidations,
    confirm: Yup
        .string()
        .oneOf(
            [Yup.ref("password")],
            "La confirmación debe coincidir con la contraseña ingresada"
        )
        .required(requiredMessage + "nuevamente la contraseña"),
});

export const loginInitialValues = {
    email: "",
    password: "",
};

export const registerInitialValues = {
    email: "",
    password: "",
    confirm: "",
}