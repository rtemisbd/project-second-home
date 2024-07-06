import { Server } from "http";
import mongoose from "mongoose";
import app from "./app.js";

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

let server = Server;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};
async function databaseConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL, options);
    console.log(`🛢 Database is connected successfully`);

    server = app.listen(process.env.PORT, () => {
      console.log(`Application  listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

databaseConnect();

process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if (server) {
    server.close();
  }
});
