
import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors';


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

//Connect to the MongoDB database
const connect = async() =>{
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongodb");
    } catch(error){
    throw error;
  }
};

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});


const Booking = mongoose.model('Booking', bookingSchema);

// Define an API endpoint to receive data from the client-side
app.post('/api/bookings', (req, res) => {
  const { name, email, phone } = req.body;

  // Create a new instance of the Booking model with the received data
  const newBooking = new Booking({
    name,
    email,
    phone
  });

  // Save the new instance of the Booking model to the database
  newBooking.save().then(() => {
    res.status(201).json({ message: 'Booking created successfully' });
  }).catch((error) => {
    res.status(500).json({ error: error.message });
  });
});

// Start the server
app.listen(8000, () => {
    connect();
  console.log('Server started on port 8000');
});
















// import express from 'express';
// import dotenv from "dotenv";
// import mongoose from "mongoose";


// const app = express();
// dotenv.config();


