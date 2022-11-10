import './Button.css'

const Button = ({
    variant = "", className = "", type = "button", label = "", ...props
}) =>
<button className={`button ${variant} ${className}`} type={type} {...props}>{label}</button>

export default Button;