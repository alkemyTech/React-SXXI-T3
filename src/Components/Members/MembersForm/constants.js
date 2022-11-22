import * as Yup from "yup";
import {
  imgRegExp,
  invalidImageFormatMessage,
  requiredMessage,
} from "../../../utils/validation/constants";

export const validationSchema = Yup.object().shape({
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
  image: Yup.string()
    .matches(imgRegExp, {
      message: invalidImageFormatMessage,
      excludeEmptyString: true,
    })
    .required(requiredMessage + "la imagen"),
});

export const initialValues = {
  name: "",
  description: "",
  image: "",
  facebookUrl: "",
  linkedinUrl: "",
};
