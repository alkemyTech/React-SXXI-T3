import * as Yup from "yup";

export const validationSchema = Yup.object({
    welcomeText: Yup.string()
        .min(20, 'El texto de bienvenida debe tener al menos 20 caracteres')
        .required('El texto de bienvenida es un campo requerido'),
    slides: Yup.array()
        .min(3, 'No puede seleccionar menos de 3 slides')
        .max(3, 'No puede seleccionar más de 3 slides')
        .required('El slide es un campo requerido')
})