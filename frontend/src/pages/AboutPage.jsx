import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-roboto p-4">
      <div className="bg-white p-8 rounded shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">
          About This Project
        </h1>
        <p className="mb-4 text-center">
          This project is an image classification application that uses various
          deep learning models to predict the class of an uploaded image. The
          model predicts among 10 different classes that are AnnualCrop, Forest,
          HerbaceousVegetation, Highway, Industrial, Pasture, PermanentCrop,
          Residential, River and SeaLake.The models include Simple CNN, VGG 16,
          and VGG 19. Among others, the VGG 19 model has the highest accuracy of
          98.25%.
        </p>
        <div className="flex space-x-4 justify-center">
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            <FontAwesomeIcon icon={faGithub} className="mr-2" />
            GitHub Repository
          </a>
          <a
            href="https://reference-paper-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
            Reference Paper
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
