import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex justify-start items-center">
      <Link
        to={destination}
        className="flex items-center bg-sky-800 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300"
      >
        <BsArrowLeft className="text-2xl mr-2" />
        <span className="text-lg font-semibold">Back</span>
      </Link>
    </div>
  );
};

export default BackButton;
