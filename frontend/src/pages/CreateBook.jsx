import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { FiSave } from "react-icons/fi";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = { title, author, publishYear, description };
    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book created successfully", { variant: "success" });
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
      <h1 className="text-4xl font-bold text-center my-6">Create Book</h1>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      ) : (
        <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700 mb-2">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700 mb-2">
                Publish Year
              </label>
              <input
                type="text"
                value={publishYear}
                onChange={e => setPublishYear(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <BackButton />
            <button
              className="flex items-center bg-green-800 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300"
              onClick={handleSaveBook}
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

export default CreateBook;
