//# connect to mongoose

import mongoose from "mongoose";

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.URL_DATABASE);
    console.log("sucessfully connect to database");
  } catch (error) {
    console.log(error);
  }
};
