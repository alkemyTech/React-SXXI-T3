import {Link} from "react-router-dom";
import {ReactComponent as PencilSvg} from '../../assets/svg/backoffice/pencil-solid.svg'
import {ReactComponent as TrashSvg} from '../../assets/svg/backoffice/trash-can-solid.svg'
import {DateParser} from "../../utils/DateParser";

import './Table.css'

const Table = ({
                   title = "",
                   className = "",
                   tableData = [],
                   tableHeader = [],
                   tableNames = [],
                   handleDelete
               }) => {

    if (tableData.length === 0) {
        return <h1 className="container text-center mt-3">No hay {title.toLowerCase()}...</h1>;
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
                        {tableHeader.map((prop, index) => (
                            <td key={index}>{prop === "created_at" ? DateParser(elem[prop]) : elem[prop]}</td>
                        ))}
                        <td className="action-icon"><Link to={`editar/${elem.id}`}><PencilSvg/></Link></td>
                        <td className="action-icon">
                            <div onClick={() => handleDelete(elem.id)}><TrashSvg/></div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default Table;

