import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          MyApp
        </div>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            <FontAwesomeIcon icon={faHome} className="mr-1" />
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
