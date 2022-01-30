import React from "react";

export default function Loader() {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
