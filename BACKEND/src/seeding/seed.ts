import mongoose from "mongoose";
import { enviromentVariables } from "../app/config/env";
import { UserDB } from "../app/modules/USER/user.model";
import {  riderSeed, seedDriverApplications } from "./seedFile";
import { DriverApplicationDB } from "../app/modules/DRIVER/driver.model";

const seedDatabase = async () => {
  try {
    await mongoose.connect(enviromentVariables.DATABASE_URL);

    console.log("Connected to MongoDB 🚀");

    // Delete previous data
    await DriverApplicationDB.deleteMany({
      role: "RIDER",
    });

    console.log("Old riders deleted");

    // Insert new data
    await DriverApplicationDB.insertMany(seedDriverApplications);

    console.log("50 riders inserted ✅");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();