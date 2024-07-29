import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { MdOutlineDeleteOutline } from "react-icons/md";

const DeleteBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then(res => {
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        enqueueSnackbar("An error occurred", { variant: "error" });
        console.log(err);
      });
  }, [id, enqueueSnackbar]);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch(err => {
        setLoading(false);
        enqueueSnackbar("An error occurred", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center my-6">Delete Book</h1>
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl text-center mb-6">
            Do you really want to delete this book?
          </h3>
          {/* <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-6"> */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              disabled
              className="border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              value={author}
              disabled
              className="border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Publish Year
            </label>
            <input
              type="text"
              value={publishYear}
              disabled
              className="border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          {description && (
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                value={description}
                disabled
                className="border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          )}

          {/* </div> */}
          <div className="flex justify-between">
            <BackButton />
            <button
              className="flex items-center bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300"
              onClick={handleDeleteBook}
            >
              <span className="text-lg font-semibold">Yes</span>
              <MdOutlineDeleteOutline className="text-2xl ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
