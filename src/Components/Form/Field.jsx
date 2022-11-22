import styles from "./Field.module.css";

export const Field = ({
  label,
  name,
  errors,
  touched,
  className = "",
  labelClassName = "",
  errorsClassName = "",
  children,
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <label htmlFor={`input-${name}`} className={labelClassName}>
        {label}
      </label>
      {children}
      {errors && touched && (
        <div className={`${styles.errorContainer} ${errorsClassName}`}>
          {errors}
        </div>
      )}
    </div>
  );
};
