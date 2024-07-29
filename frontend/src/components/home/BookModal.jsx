import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { IoIosCalendar } from "react-icons/io";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={event => event.stopPropagation()}
        className="w-[600px] max-w-full max-h-[80vh] bg-white rounded-xl p-6 flex flex-col relative overflow-auto shadow-lg"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer hover:text-red-800"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg text-lg font-bold">
          {book.title}
        </h2>
        <h4 className="my-2 text-gray-500 break-words">{book._id}</h4>
        <div className="flex items-center gap-x-2 my-2">
          <BiUserCircle className="text-red-500 text-2xl" />
          <h2 className="text-xl truncate max-w-[500px]" title={book.author}>
            {book.author}
          </h2>
        </div>
        <div className="flex items-center gap-x-2 my-2">
          <IoIosCalendar className="text-red-500 text-2xl" />
          <h2
            className="text-xl truncate max-w-[500px]"
            title={book.publishYear}
          >
            {book.publishYear}
          </h2>
        </div>
        {book.description && (
          <div className="flex items-center gap-x-2 my-2">
            <MdOutlineSpeakerNotes className="text-red-500 text-2xl flex-shrink-0" />
            <p className="text-gray-600">{book.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookModal;
