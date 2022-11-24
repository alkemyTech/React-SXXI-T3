import { Field } from "./Field";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const CKEditorField = ({
  value,
  name,
  setFieldValue,
  setFieldTouched,
  label,
  placeholder = "Ingrese el texto",
  errors,
  touched,
  className = "",
  labelClassName = "",
  errorsClassName = "",
}) => {
  return (
    <Field
      label={label}
      name={name}
      touched={touched}
      className={className}
      errorClassName={errorsClassName}
      labelClassName={labelClassName}
      errors={errors}
    >
      <CKEditor
        editor={ClassicEditor}
        config={{ placeholder: placeholder }}
        data={value}
        onFocus={(event, editor) => editor.setData(value)}
        onChange={(event, editor) => {
          const data = editor.getData();
          setFieldValue(name, data);
        }}
        onBlur={() => setFieldTouched(name)}
        onError={(errorInstance, errorDetail) =>
          console.log({ errorInstance, errorDetail })
        }
      />
    </Field>
  );
};
