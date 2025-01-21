import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/jobautofiller", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};

export default dbConnect;
