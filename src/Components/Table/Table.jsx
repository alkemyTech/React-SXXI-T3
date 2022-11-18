import {useState} from "react";
import {Link} from "react-router-dom";
import {ReactComponent as PencilSvg} from "../../assets/svg/backoffice/pencil-solid.svg";
import {ReactComponent as TrashSvg} from "../../assets/svg/backoffice/trash-can-solid.svg";
import {DateParser} from "../../utils/DateParser";
import Button from "react-bootstrap/Button";
import {ImageModal} from "./ImageModal";

import "./Table.css";


const Table = ({
                   title = "",
                   className = "",
                   tableData = [],
                   tableHeader = [],
                   tableNames = [],
                   handleDelete,
               }) => {
    const [modal, setModal] = useState({show: false, url: ''});

    if (tableData.length === 0) {
        return (
            <h1 className="container text-center mt-3">
                No hay {title.toLowerCase()}...
            </h1>
        );
    }

    const handleShowModal = (url) => {
      setModal({show: true, url: url});
    }

    const handleCloseModal = () => {
      setModal({show: false, url: ''});
    }

    const itemHelper = (item, name) => {
        if (name === "created_at") {
            return DateParser(item[name]);
        }
        if (name === "image") {
            return (
                <>
                    <Button variant="link" onClick={() => handleShowModal(item[name])}>
                        {item[name]}
                    </Button>

                </>
            )
        }
        return item[name];
    }

    return (
        <div className={`container table-responsive backoffice-table ${className}`}>
            <table className="table table-striped table-hover table-bordered align-middle">
                <thead>
                <tr>
                    {tableNames.map((elem, index) => (
                        <th key={index}>{elem}</th>
                    ))}
                    <th className="icon-th"/>
                    <th className="icon-th"/>
                </tr>
                </thead>
                <tbody>
                {tableData.map((elem, index) => (
                    <tr key={index}>
                        {tableHeader.map((prop, index) =>
                            <td key={index}>
                                {itemHelper(elem, prop)}
                            </td>)}
                        <td className="action-icon">
                            <Link to={`editar/${elem.id}`}>
                                <PencilSvg/>
                            </Link>
                        </td>
                        <td className="action-icon">
                            <div onClick={() => handleDelete(elem.id)}>
                                <TrashSvg/>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
          <ImageModal
              show={modal.show}
              onHide={() => handleCloseModal()}
              url={modal.url}
          />
        </div>
    );
};
export default Table;
