import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    requierd: true,
  },
  author: {
    type: String,
    requierd: true,
  },
  publishYear: {
    type: Number,
    requierd: true,
  },
  description: {
    type: String,
  },
});

export const Book = mongoose.model("Book", bookSchema);
