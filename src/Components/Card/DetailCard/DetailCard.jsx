import {DateParser} from "./DateParser";
import Button from "../../Button/Button";

import './DetailCard.css'

const DetailCard = ({content, date, color, buttonLabel, onClick, imageUrl, imagAlt, children, ...props}) => {
    const htmlContent = {__html: content}
    const parsedDate = DateParser(date);
    return (
        <div className={`card ${color}`}>
            {children}
            <img src={imageUrl} alt={imagAlt} className="card-image"/>
            <div className="card-text" dangerouslySetInnerHTML={htmlContent}/>
            <small className="card-date">{parsedDate}</small>
            <Button variant={color} label={buttonLabel} onClick={onClick}/>
        </div>
    );
}

export default DetailCard;