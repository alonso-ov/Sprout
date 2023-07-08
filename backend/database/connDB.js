import mongoose from "mongoose";

const url =
  "mongodb+srv://userdatacluster.tool84e.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority";
await mongoose.connect(url, {
  sslValidate: true,
  tlsCertificateKeyFile: "./certs/X509-mongoDB.pem",
  authMechanism: "MONGODB-X509",
  authSource: "$external",
});

const connDB = async () => {
  const connection = await mongoose
    .connect(url, {
      sslValidate: true,
      tlsCertificateKeyFile: "./certs/X509-mongoDB.pem",
      authMechanism: "MONGODB-X509",
      authSource: "$external",
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
    });
  console.log("Successfully connected to MongoDB");
};

export default connDB;