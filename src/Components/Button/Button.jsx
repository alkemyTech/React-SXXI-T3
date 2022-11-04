import './Button.css'

const Button = ({
                    variant = "", className = "", label = "", ...props
                }) =>
    <button className={`button ${variant} ${className}`} {...props}>{label}</button>

export default Button;