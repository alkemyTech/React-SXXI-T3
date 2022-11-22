import { Link } from "react-router-dom";

import Table from "../../Table/Table";

import "./BackofficeList.css";

const BackofficeList = ({
  title,
  createButonLabel = "",
  createButonVariant = "primary",
  tableClassName = "",
  tableData = [],
  tableHeader = [],
  tableNames = [],
  deleteFunction,
}) => {
  return (
    <>
      <div className="container backoffice-header">
        <h1>{title}</h1>
        <Link
          to={"crear"}
          className={`button ${createButonVariant}`}
        >{`Crear ${createButonLabel.toLowerCase()}`}</Link>
      </div>
      <div className="backoffice-table-container">
        <Table
          className={tableClassName}
          title={title}
          tableData={tableData}
          tableNames={tableNames}
          tableHeader={tableHeader}
          handleDelete={deleteFunction}
        />
      </div>
    </>
  );
};

export default BackofficeList;
