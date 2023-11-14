// import mongoose for mongodb connection
import mongoose from 'mongoose';

// flag to track the connection status
let isConnected = false;

// function to connect to mongodb
export const connectToDB = async () => {
     // set strictQuery to true for mongoose
     mongoose.set('strictQuery', true);

     // check if already connected
     if (isConnected) {
          console.log('MongoDB is already connected');
          return;
     }

     try {
          // connect to MongoDB using the provided url and database name
          await mongoose.connect(process.env.MONGODB_URL, {
               dbName: 'share_prompts'
          });

          // set isConnected to true after successful connection
          isConnected = true;

          // log a message indicating successful connection
          console.log('MongoDB Connected');
     } catch (error) {
          // log any errors that occur during the connection attempt
          console.log(error);
     }
};
