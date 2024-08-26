import mongoose from "mongoose";

//# create a schema for category
const userSchema = new mongoose.Schema(
  {
    fullname: String,
    email: String,
    password: String,
    token: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },

  { timestamps: true }
);

//# create model task (name, schema, collection name)
const user = mongoose.model("user", userSchema, "users");

//# export model
export default user;
