import { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FiSave } from "react-icons/fi";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

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

  const handleEditBook = () => {
    const data = { title, author, publishYear, description };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book edited successfully", { variant: "success" });
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
      <h1 className="text-4xl font-bold text-center my-6">Edit Book</h1>
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
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
              onChange={e => setAuthor(e.target.value)}
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
              onChange={e => setPublishYear(e.target.value)}
              className="border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="border-2 border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex justify-between">
            <BackButton />
            <button
              className="flex items-center bg-green-800 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300"
              onClick={handleEditBook}
            >
              <span className="text-lg font-semibold">Save</span>
              <FiSave className="text-2xl ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBook;
