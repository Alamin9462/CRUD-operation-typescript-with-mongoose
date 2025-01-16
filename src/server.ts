import mongoose from "mongoose";
import app from "./app";
import Config_File from "./Config_File";

async function main() {
  try {
    await mongoose.connect(Config_File.database as string);
    app.listen(Config_File.port, () => {
      console.log(`Example app listening on port ${Config_File.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
