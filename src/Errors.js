import React from "react";

const Errors = ({ errors }) => {
  console.log("ERROR COMPONENT", errors);
  return errors.length > 0 ? (
    <ul className="alert alert-danger">
      {errors.map((error, i) => {
        return error.errors ? (
          error.errors.map((_error, j) => {
            return <li key={i + j + _error.message}>{_error.message}</li>;
          })
        ) : error.length > 0 ? (
          <li key={i + error.message}>{error}</li>
        ) : (
          ""
        );
      })}
    </ul>
  ) : (
    ""
  );
};

export default Errors;
