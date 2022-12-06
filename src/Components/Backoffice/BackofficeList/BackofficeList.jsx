import { Link } from "react-router-dom";
import SearchInput from "../../SearchInput";

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
    openImageInNewTab = false,
    handleChange,
    handleSubmit,
    handleSelectChange,
    hasOptions,
    placeholder,
    source,
}) => {

    return (
        <>
            <div className="container backoffice-header">
                <h1>{title}</h1>
                <Link to={"crear"} className={`button ${createButonVariant}`}>{`Crear ${createButonLabel.toLowerCase()}`}</Link>
                <SearchInput
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleSelectChange={handleSelectChange}
                    hasOptions={hasOptions}
                    placeholder={placeholder}
                    source={source}
                />
            </div>
            <div className="backoffice-table-container">
                <Table className={tableClassName} title={title} tableData={tableData} tableNames={tableNames}
                    tableHeader={tableHeader} handleDelete={deleteFunction} openImageInNewTab={openImageInNewTab} />
            </div>
        </>
    )

}

export default BackofficeList;