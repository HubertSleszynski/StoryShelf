import { Link } from "react-router-dom";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import BookModal from "./BookModal";
import { IoIosCalendar } from "react-icons/io";
import { PiBookOpen } from "react-icons/pi";
import { MdOutlineSpeakerNotes } from "react-icons/md";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      key={book._id}
      className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 m-4 relative"
      style={{ minHeight: "300px" }}
    >
      <div className="absolute top-1 right-2 px-4 py-1 m-1 bg-gray-200 rounded-lg text-sm font-semibold text-gray-600 ">
        {book._id}
      </div>
      <div className="mt-12">
        <div className="flex items-center mb-2">
          <PiBookOpen className="text-red-500 text-2xl mr-2" />
          <h2 className="text-xl font-bold text-gray-800 truncate w-80">
            {book.title}
          </h2>
        </div>
        <div className="flex items-center mb-2">
          <BiUserCircle className="text-red-500 text-2xl mr-2" />
          <h3 className="text-gray-700 truncate w-80">{book.author}</h3>
        </div>
        <div className="flex items-center mb-2">
          <IoIosCalendar className="text-red-500 text-2xl mr-2" />
          <h3 className="text-gray-700 truncate w-80">{book.publishYear}</h3>
        </div>
        {book.description && (
          <div className="flex items-center mb-2">
            <MdOutlineSpeakerNotes className="text-red-500 text-2xl mr-2" />
            <p className="text-gray-700 truncate w-80">{book.description}</p>
          </div>
        )}
      </div>
      <div className="flex justify-around mt-16">
        <BiShow
          className="text-3xl text-blue-600 hover:text-blue-800 cursor-pointer"
          onClick={() => setShowModal(true)}
          title="Show Details"
        />
        <Link to={`/books/details/${book._id}`} title="Book Details">
          <BsInfoCircle className="text-2xl text-green-600 hover:text-green-800 cursor-pointer" />
        </Link>
        <Link to={`/books/edit/${book._id}`} title="Edit Book">
          <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-yellow-800 cursor-pointer" />
        </Link>
        <Link to={`/books/delete/${book._id}`} title="Delete Book">
          <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-800 cursor-pointer" />
        </Link>
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
