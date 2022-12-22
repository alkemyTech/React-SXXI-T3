import * as Yup from "yup";
import {
  imageValidation,
  imageValidationRequired,
  numRegExp,
  requiredMessage,
} from "../../../utils/validation/constants";

const validations = {
  name: Yup.string()
    .min(4, "El título debe tener al menos 4 caracteres")
    .required(requiredMessage + "el título"),
  description: Yup.string().required(requiredMessage + "la descripción"),
  order: Yup.string()
    .trim()
    .matches(numRegExp, "El orden debe ser un número")
    .required(requiredMessage + "el número de orden"),
};

export const createValidationSchema = Yup.object().shape({
  ...validations,
  ...imageValidationRequired,
});

export const editValidationSchema = Yup.object().shape({
  ...validations,
  ...imageValidation,
});

export const initialValues = {
  name: "",
  description: "",
  image: "",
  order: "",
};
