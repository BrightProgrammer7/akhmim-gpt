import React from "react";
import "./TextGenerator.css";

function Output({ response }) {
  return (
    <div className="Output">
      {/* <p className="rqt">{request}</p> */}
      <p className="rps">{response}</p>
    </div>
  );
}

export default Output;
