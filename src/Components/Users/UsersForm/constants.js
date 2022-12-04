import * as Yup from "yup";
import {
  imageValidation,
  imageValidationRequired,
  requiredMessage,
} from "../../../utils/validation/constants";

const validations = {
  name: Yup.string()
    .min(4, "El nombre debe tener al menos 4 caracteres")
    .required(requiredMessage + "el nombre"),
  email: Yup.string()
    .email("Ingrese un email válido")
    .required(requiredMessage + "el email"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 4 caracteres")
    .required(requiredMessage + "la contraseña"),
  role: Yup.string().required(requiredMessage + "el rol"),
};

export const createValidationSchema = Yup.object().shape({
  ...validations,
  imageValidationRequired,
});

export const editValidationSchema = Yup.object().shape({
  ...validations,
  imageValidation,
});

export const initialValues = {
  name: "",
  email: "",
  password: "",
  image: "",
  role: "",
};
