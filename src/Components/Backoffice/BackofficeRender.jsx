import { Spinner } from "../Feedback/Spinner/Spinner";

import "./BackofficeRender.css";

export const BackofficeRender = ({ isFetching, children }) => {
  return (
    <>
      {isFetching ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </>
  );
};
