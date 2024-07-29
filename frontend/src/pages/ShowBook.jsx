import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then(res => {
        setBook(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center my-6">Book Details</h1>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-xl max-h-xl h-full w-full bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg shadow-md bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Title
              </h3>
              <p className="text-gray-800 truncate max-w-[500px]">
                {book.title}
              </p>
            </div>
            <div className="p-4 border rounded-lg shadow-md bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Author
              </h3>
              <p className="text-gray-800 truncate max-w-[500px]">
                {book.author}
              </p>
            </div>
            <div className="p-4 border rounded-lg shadow-md bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">ID</h3>
              <p className="text-gray-800">{book._id}</p>
            </div>
            <div className="p-4 border rounded-lg shadow-md bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Publish Year
              </h3>
              <p className="text-gray-800">{book.publishYear}</p>
            </div>
            {book.description && (
              <div className="p-4 border rounded-lg shadow-md bg-gray-50 md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Description
                </h3>
                <p className="text-gray-800">{book.description}</p>
              </div>
            )}

            <BackButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
