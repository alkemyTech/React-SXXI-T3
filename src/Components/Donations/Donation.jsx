import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../Button/Button";

import "./styles.css";
import Thanks from "./Thanks";

const Donation = ({message = "¿Querés contribuir?"}) => {

    const handleClick = () => {
        Swal.fire({
            title: "Gracias por su contribución 💓"
        });
    } ;

    return(
        <div>
            <h1 className="donation_title">{message}</h1>
            <Button className="donation_button" label={<Link to="/gracias" className="donation_button_text">Contribuir</Link>} onClick={handleClick}/>
        </div>
    );
}

export default Donation;