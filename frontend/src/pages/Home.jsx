import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then(res => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="px-6 pt-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">StoryShelf</h1>
        <Link
          to="/books/create"
          className="flex items-center text-sky-800 hover:text-sky-600 transition-colors duration-300"
        >
          <span className="text-xl font-semibold">Add</span>
          <MdOutlineAddBox className="text-4xl ml-2" />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          className={`px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 ${
            showType === "table"
              ? "bg-sky-600 hover:bg-sky-800"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className={`px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 ${
            showType === "card"
              ? "bg-sky-600 hover:bg-sky-800"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
      <footer className="p-4 font-semibold flex justify-center items-center">
        &copy; HRS | StoryShelf
      </footer>
    </div>
  );
};

export default Home;
