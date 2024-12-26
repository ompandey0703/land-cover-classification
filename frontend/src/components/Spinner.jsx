import React from "react";
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <ClipLoader color="#3b82f6" size={50} />
    </div>
  );
};

export default Spinner;
