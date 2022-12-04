import Modal from "react-bootstrap/Modal";
import Button from "../Button/Button";

export const ImageModal = ({ url, show, onHide }) => {
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
          <img src={url} alt={url} className="modal-body-image" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} label="Cerrar" variant="primary" />
        </Modal.Footer>
      </Modal>
    </div>
  );
};