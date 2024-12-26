import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [model, setModel] = useState("Simple CNN model");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(""); // State for file name
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const validExtensions = ["image/jpeg", "image/png", "image/jpg"];
    if (selectedFile && validExtensions.includes(selectedFile.type)) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Set the file name
    } else {
      toast.error(
        "Please upload an image with a valid extension (jpeg, jpg, png)."
      );
    }
  };

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const handlePredict = async () => {
    if (!file) {
      toast.error("Please upload an image.");
      return;
    }

    setLoading(true); // Show spinner

    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", model);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(response.data.predicted_class_name);
    } catch (error) {
      console.error(error);
      toast.error("Error making prediction. Check the console for details.");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-roboto">
      <h1 className="text-3xl font-bold mb-4">Image Classification</h1>
      <label className="mb-4 p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700">
        Choose File
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
      {fileName && <p className="mb-4">{fileName}</p>} {/* Display file name */}
      <select
        value={model}
        onChange={handleModelChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="Simple CNN model">Simple CNN model</option>
        <option value="VGG 16 no weights model">VGG 16 no weights model</option>
        <option value="VGG 16 model">VGG 16 model</option>
        <option value="VGG 19 model">VGG 19 model</option>
        <option value="VGG 16 regularized model">
          VGG 16 regularized model
        </option>
        {/* Add more models here if needed */}
      </select>
      <button
        onClick={handlePredict}
        className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Predict
      </button>
      {loading && <Spinner />}
      {result && !loading && (
        <div className="mt-4 p-4 bg-white shadow rounded">
          <h2 className="text-xl font-bold mb-2">Prediction Result:</h2>
          <p>{result}</p>
        </div>
      )}
      <div className="mt-8 p-4 bg-white shadow rounded w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Model Details</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>Simple CNN model:</strong> A basic convolutional neural
            network model.
          </li>
          <li>
            <strong>VGG 16 no weights model:</strong> VGG 16 model without
            pre-trained weights.
          </li>
          <li>
            <strong>VGG 16 model:</strong> VGG 16 model with pre-trained
            weights.
          </li>
          <li>
            <strong>VGG 19 model:</strong> VGG 19 model with pre-trained
            weights, highest accuracy of 98.25%.
          </li>
          <li>
            <strong>VGG 16 regularized model:</strong> VGG 16 model with
            regularization techniques applied.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
