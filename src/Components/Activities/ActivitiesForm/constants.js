import * as Yup from "yup";
import {
  imageValidation,
  imageValidationRequired,
  requiredMessage,
} from "../../../utils/validation/constants";

const validations = {
  name: Yup.string().required(requiredMessage + "el nombre"),
  description: Yup.string(),
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
  image: "",
  description: "",
};
