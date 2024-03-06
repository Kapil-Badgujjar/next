import mongoose from "mongoose";

const connect = async (): Promise<void> => {
  if (mongoose.connections[0].readyState) {
    return; // Connection already established
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL as string, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;
