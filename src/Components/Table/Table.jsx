import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as PencilSvg } from "../../assets/svg/backoffice/pencil-solid.svg";
import { ReactComponent as TrashSvg } from "../../assets/svg/backoffice/trash-can-solid.svg";
import { DateParser } from "../../utils/DateParser";
import Button from "react-bootstrap/Button";
import { ImageModal } from "./ImageModal";

import "./Table.css";



const Table = ({
  title = "",
  className = "",
  tableData = [],
  tableHeader = [],
  tableNames = [],
  handleDelete,
}) => {
  const [modalShow, setModalShow] = useState(false);

  if (tableData.length === 0) {
    return (
      <h1 className="container text-center mt-3">
        No hay {title.toLowerCase()}...
      </h1>
    );
  }

  return (
    <div className={`container table-responsive backoffice-table ${className}`}>
      <table className="table table-striped table-hover table-bordered align-middle">
        <thead>
          <tr>
            {tableNames.map((elem, index) => (
              <th key={index}>{elem}</th>
            ))}
            <th className="icon-th" />
            <th className="icon-th" />
          </tr>
        </thead>
        <tbody>
          {tableData.map((elem, index) => (
            <tr key={index}>
              {tableHeader.map((prop, index) => (
                <td key={index}>
                  {prop === "created_at" ? (
                    DateParser(elem[prop])
                  ) : prop === "image" ? (
                    <>
                      <Button variant="link" onClick={() => setModalShow(true)}>
                        {elem[prop]}
                      </Button>

                      <ImageModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        url={elem[prop]}
                      />
                    </>
                  ) : (
                    elem[prop]
                  )}
                </td>
              ))}
              <td className="action-icon">
                <Link to={`editar/${elem.id}`}>
                  <PencilSvg />
                </Link>
              </td>
              <td className="action-icon">
                <div onClick={() => handleDelete(elem.id)}>
                  <TrashSvg />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
