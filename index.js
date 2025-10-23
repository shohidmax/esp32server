const express = require('express');
const cors = require('cors'); // <<-- 1. CORS require করুন
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bodyParser = require('body-parser');
// const { createCanvas, loadImage } = require('canvas');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); // Removed unused ISODate
const { error } = require('console');
const app = express();
const port = process.env.PORT || 3000;


// const http = require('http').createServer(app); // Not needed unless using socket.io directly here
// const io = require('socket.io')(http); // Not used in this code snippet
app.use(express.static('public'));
//----------------------avatar api resorce -----------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// -----------------avatar api close ----------

// --- CORS Middleware ---
app.use(cors()); // <<-- 2. CORS middleware ব্যবহার করুন (API রুটের আগে)
// --- End CORS ---

app.use(express.json());

const uri = "mongodb+srv://atifsupermart202199:FGzi4j6kRnYTIyP9@cluster0.bfulggv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();
    console.log('db connected');
    // Renamed collection variables for clarity
    const espDataCollection = client.db('Esp32data').collection('espdata2'); // Assuming espdata2 is the one you use for GET and POST

    // Removed unused collections and functions like node()
    // Removed unused jwt variable and related code if any was planned but not implemented

    // Routes
    //----------------------------------------------------------------
    // Get all ESP data
    app.get('/api/esp32', async (req, res) => {
      try {
        const query = {};
        const cursor = espDataCollection.find(query);
        const data = await cursor.toArray();
        res.send(data);
      } catch (err) {
        console.error("Error fetching ESP data:", err);
        res.status(500).send({ message: "Error fetching data from database" });
      }
    });

    // Post new ESP data reading
    app.post('/api/esp32p', async (req, res) => {
      try {
        const reading = req.body;
        // Basic validation (optional but recommended)
        if (!reading.uid || reading.temperature == null || reading.water_level == null || reading.rainfall == null || !reading.timestamp) {
            return res.status(400).send({ message: "Missing required fields in reading data" });
        }
        const result = await espDataCollection.insertOne(reading);
        res.status(201).send(result); // Use 201 Created status for successful posts
      } catch (err) {
        console.error("Error inserting ESP data:", err);
        res.status(500).send({ message: "Error inserting data into database" });
      }
    });

    // Get specific ESP reading by ID (less common for sensor data, but kept)
    app.get('/api/esp32/:id', async (req, res) => { // Changed route parameter name for clarity
       try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid ID format" });
        }
        const query = { _id: new ObjectId(id) }; // Use new ObjectId
        const reading = await espDataCollection.findOne(query);
        if (!reading) {
            return res.status(404).send({ message: "Reading not found" });
        }
        res.send(reading);
       } catch (err) {
         console.error("Error fetching ESP data by ID:", err);
         res.status(500).send({ message: "Error fetching data from database" });
       }
    });

    // Removed other unused routes like /api/accounts, /api/wholesale, /api/lotary, /api/accountsreportbydate
    // If you need them, they should be added back similarly, ensuring they use correct collections.


  } catch (dbConnectError) { // Catch connection errors separately
      console.error("Failed to connect to MongoDB:", dbConnectError);
      // Optional: Exit the process if DB connection is critical
      // process.exit(1);
  }
  // No finally block needed here as client connection should persist

}
run().catch(console.dir); // Keep this for initial connection errors


app.get("/", (req, res) => {
  res.send(`<h1 style="text-align: center; color: red;"> Server is Running at <span style="color: Blue;">${port}</span></h1>`);
});

// Use http.listen if you plan to use socket.io later, otherwise app.listen is fine
// http.listen(port, () => {
app.listen(port, () => { // Using app.listen since socket.io wasn't used
  console.log(`Server running at http://localhost:${port}`); // Updated log message
});

