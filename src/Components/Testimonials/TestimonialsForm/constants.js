import * as Yup from "yup";
import {imageValidation, imageValidationRequired, requiredMessage,} from "../../../utils/validation/constants";

const validations = {
  name: Yup.string()
    .min(4, "El título debe tener al menos 4 caracteres")
    .required(requiredMessage + "el título"),
  description: Yup.string().required(requiredMessage + "la descripción"),
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
};
