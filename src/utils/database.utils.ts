import mongoose from "mongoose";

const connectToDatabase = async () => {
  let connectionSuccess = false;
  const client = await mongoose
    .connect(
      `mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_DATABASE}}`
    )
    .then((result) => {
      console.log("MongoDB connection success");
      connectionSuccess = true;
    })
    .catch((err) => {
      console.log("MongoDB connection error");
    });
  return { client, connectionSuccess };
};

export { connectToDatabase };
