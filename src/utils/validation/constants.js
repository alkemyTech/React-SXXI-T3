import * as Yup from "yup";

export const requiredMessage = "Por favor, ingrese ";

export const invalidImageFormatMessage =
  "Formato inválido (sólo se aceptan archivos jpg/jpeg/png)";

export const numRegExp = new RegExp(/^[0-9]/, "i");

export const imgRegExp = /\.(jpe?g|png)$/i;

export const imageValidation = {
  image: Yup.string().matches(imgRegExp, {
    message: invalidImageFormatMessage,
    excludeEmptyString: true,
  }),
};

export const imageValidationRequired = {
  image: Yup.string()
    .matches(imgRegExp, {
      message: invalidImageFormatMessage,
      excludeEmptyString: true,
    })
    .required(requiredMessage + "la imagen"),
};
