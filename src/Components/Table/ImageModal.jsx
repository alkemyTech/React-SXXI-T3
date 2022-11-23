import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ImageModal = ({url, show, onHide}) => {
    return (
        <div className="img-modal">
            <Modal
                show={show}
                onHide={onHide}
                size="sm"
                backdropClassName="img-modal"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={url} alt={url}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};