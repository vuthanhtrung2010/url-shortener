import mongoose from "mongoose";

const schema = new mongoose.Schema({
  path: String,
  redirect: String,
  redirect_path: Boolean,
  created: String,
  hits: Number,
});

export default mongoose.model("redirects", schema, "redirects");
