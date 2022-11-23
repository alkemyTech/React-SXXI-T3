import * as Yup from "yup";
import {
  imgRegExp,
  invalidImageFormatMessage,
  requiredMessage,
} from "../../../utils/validation/constants";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(requiredMessage + "el nombre"),
  logo: Yup.string()
    .matches(imgRegExp, {
      message: invalidImageFormatMessage,
      excludeEmptyString: true,
    })
    .required(requiredMessage + "el logo"),
  facebook_url: Yup.string()
    .url("Url de Facebook inválida")
    .required(requiredMessage + "la url de Facebook"),
  linkedin_url: Yup.string()
    .url("Url de LinkedIn inválida")
    .required(requiredMessage + "la url de LinkedIn"),
  instagram_url: Yup.string()
    .url("Url de Instagram inválida")
    .required(requiredMessage + "la url de Instagram"),
  twitter_url: Yup.string()
    .url("Url de Twitter inválida")
    .required(requiredMessage + "la url de Twitter"),
  short_description: Yup.string().required(
    requiredMessage + "la descripción corta"
  ),
  long_description: Yup.string().required(
    requiredMessage + "la descripción larga"
  ),
});

export const initialValues = {
  name: "",
  logo: "",
  facebook_url: "",
  linkedin_url: "",
  instagram_url: "",
  twitter_url: "",
  short_description: "",
  long_description: "",
};
