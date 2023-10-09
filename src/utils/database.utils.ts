import mongoose from "mongoose";
const connectToDatabase = async () => {
  let connectionSuccess = false;
  const client = await mongoose
    .connect(
      `mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_DATABASE}}`
      // "mongodb://127.0.0.1:27017/"
    )
    .then((result) => {
      console.log("MongoDB connection success");
      connectionSuccess = true;
    })
    .catch((err) => {
      console.log("MognoDB connection error");
    });
  return { client, connectionSuccess };
};

export { connectToDatabase };

// PROXIMO PASSO AQUI VAI SER IMPLEMENTAR UM POPULATE DE DADOS TESTE
