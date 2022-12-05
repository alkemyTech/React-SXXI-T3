import {useEffect} from "react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {Field} from "./Field";

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
  useEffect(() => {
    if(errors && touched){
      document.getElementsByClassName("ck")[0]?.classList.add("error");
    }else{
      document.getElementsByClassName("ck")[0]?.classList.remove("error");
    }
  }, [errors, touched]);

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
