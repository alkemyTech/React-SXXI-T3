import * as Yup from "yup";
import {imageValidation, imageValidationRequired, requiredMessage,} from "../../../utils/validation/constants";

const validations = {
  name: Yup.string()
    .min(4, "El nombre debe tener al menos 4 caracteres")
    .required(requiredMessage + "el nombre"),
  facebookUrl: Yup.string()
    .url("Url de Facebook inválida")
    .required(requiredMessage + "la url de Facebook"),
  linkedinUrl: Yup.string()
    .url("Url de LinkedIn inválida")
    .required(requiredMessage + "la url de LinkedIn"),
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
  facebookUrl: "",
  linkedinUrl: "",
};
