import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const ImageModal = (props) => {
  return (
    <div  className="img-modal">
    <Modal
      {...props}
      size="sm"
      backdropClassName="img-modal"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Imagen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={props.url} alt={props.url} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};