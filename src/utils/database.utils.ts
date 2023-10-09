import { MongoClient } from "mongodb";

const connectToDatabase = async () => {
  let connectionSuccess = false;
  const client = await MongoClient.connect(
    `mongodb://${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_DATABASE}}`
    // "mongodb://127.0.0.1:27017/"
  )
    .then((result) => {
      console.log("MognoDB connection success");
      connectionSuccess = true;
      console.log(result);
    })
    .catch((err) => {
      console.log("MognoDB connection error");
      console.log(err.message);
    });
  return { client, connectionSuccess };
};

export { connectToDatabase };

// PROXIMO PASSO AQUI VAI SER IMPLEMENTAR UM POPULATE DE DADOS TESTE
