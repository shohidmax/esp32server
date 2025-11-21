const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app); // HTTP সার্ভার তৈরি

// Socket.io সেটআপ (CORS সহ)
const io = require('socket.io')(http, {
  cors: {
    origin: "*", // সব জায়গা থেকে এক্সেস এর জন্য
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 3000;

// মিডলওয়্যার
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // public ফোল্ডার স্ট্যাটিক হিসেবে সেট করা
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB কানেকশন স্ট্রিং
const uri = "mongodb+srv://atifsupermart202199:FGzi4j6kRnYTIyP9@cluster0.bfulggv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Socket.io কানেকশন লগ
io.on('connection', (socket) => {
  console.log('A user connected via Socket.io');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

async function run() {
  try {
    await client.connect();
    console.log('DB connected successfully');
    
    const database = client.db('Esp32data4');
    const EspCollection = database.collection('espdata2');
    // অন্যান্য কালেকশন যদি থাকে, এখানে ডিফাইন করুন
    // const wholesaleCollection = ...

    // --- POST API (ESP32 থেকে ডাটা আসবে) ---
    app.post('/api/esp32p', async (req, res) => {
      try {
        const sensorData = req.body;
        
        // ১. ডাটাবেসে সেভ করা
        const result = await EspCollection.insertOne(sensorData);
        
        // ২. রিয়েল-টাইম ক্লায়েন্টে পাঠানো (Socket.io)
        // 'new-data' ইভেন্ট নামে ডাটা পাঠানো হচ্ছে
        io.emit('new-data', sensorData);
        console.log("Realtime data emitted:", sensorData);

        res.send(result);
      } catch (err) {
        console.error("Error in POST:", err);
        res.status(500).send("Error saving data");
      }
    });

    // --- GET API (পূর্বের ডাটা দেখার জন্য) ---
    app.get('/api/esp32', async(req, res) =>{
      const query = {};
      // শেষের ১০টি ডাটা দেখানোর জন্য সর্ট করা হলো
      const cursor = EspCollection.find(query).sort({_id: -1}).limit(50);
      const Data = await cursor.toArray();
      res.send(Data);
    });

    // ডিফল্ট রাউট
    app.get("/", (req, res) => {
      res.send(`<h1 style="text-align: center; color: red;"> Server is Running at <span style="color: Blue;">${port}</span></h1><p style="text-align:center"><a href="/index.html">Go to Dashboard</a></p>`);
    });

  } finally {
    // await client.close(); // সার্ভার চালু রাখতে এটি বন্ধ করা যাবে না
  }
}
run().catch(console.dir);

// গুরুত্তপূর্ণ: app.listen এর বদলে http.listen ব্যবহার করতে হবে
http.listen(port, () => {
  console.log("Max It server running at : ", port);
});
