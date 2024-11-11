import { Server } from "http";
import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

let server = Server;
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 10000,
//   socketTimeoutMS: 45000,
//   maxPoolSize: 10,
//   family: 4,
// };

async function databaseConnect() {
  try {
    // await mongoose.connect(config.database_url, options);
    await mongoose.connect(config.database_url);
    console.log(`🛢 Database is connected successfully`);

    server = app.listen(process.env.PORT, () => {
      console.log(`Application  listening on port ${config.port}`);
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
