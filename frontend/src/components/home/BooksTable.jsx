import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import BookModal from "./BookModal";
import { BiShow } from "react-icons/bi";

const BooksTable = ({ books }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleShowModal = book => {
    setSelectedBook(book);
    setShowModal(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md divide-y divide-gray-200">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-3 border-b text-center font-semibold text-lg">
              No
            </th>
            <th className="px-6 py-3 border-b text-center font-semibold text-lg">
              Title
            </th>
            <th className="px-6 py-3 border-b text-center font-semibold text-lg hidden md:table-cell">
              Author
            </th>
            <th className="px-6 py-3 border-b text-center font-semibold text-lg hidden md:table-cell">
              Publish Year
            </th>
            <th className="px-6 py-3 border-b font-semibold text-lg text-center">
              Operations
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {books.map((book, index) => (
            <tr
              key={book._id}
              className="hover:bg-gray-50 transition-colors duration-300"
            >
              <td className="px-6 py-4 border-b text-sm font-medium text-gray-900 text-center border-r-2">
                {index + 1}
              </td>
              <td className="px-6 py-4 border-b text-sm font-medium text-gray-900 text-left border-r-2">
                {book.title}
              </td>
              <td className="px-6 py-4 border-b text-sm text-gray-700 hidden md:table-cell text-left border-r-2">
                {book.author}
              </td>
              <td className="px-6 py-4 border-b text-sm text-gray-700 hidden md:table-cell text-center border-r-2">
                {book.publishYear}
              </td>
              <td className="px-6 py-4 border-b text-left">
                <div className="flex gap-3 items-center justify-center">
                  <BiShow
                    className="text-3xl text-blue-800 hover:text-black cursor-pointer"
                    onClick={() => handleShowModal(book)}
                  />
                  <Link
                    to={`/books/details/${book._id}`}
                    className="text-green-600 hover:text-green-800 transition-colors duration-200"
                    aria-label="View details"
                  >
                    <BsInfoCircle className="text-2xl" />
                  </Link>
                  <Link
                    to={`/books/edit/${book._id}`}
                    className="text-yellow-600 hover:text-yellow-800 transition-colors duration-200"
                    aria-label="Edit book"
                  >
                    <AiOutlineEdit className="text-2xl" />
                  </Link>
                  <Link
                    to={`/books/delete/${book._id}`}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    aria-label="Delete book"
                  >
                    <MdOutlineDelete className="text-2xl" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && selectedBook && (
        <BookModal book={selectedBook} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BooksTable;
