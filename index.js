const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bodyParser = require('body-parser');
// const { createCanvas, loadImage } = require('canvas');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId, ISODate } = require('mongodb');
const { error } = require('console');
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.static('public'));
//----------------------avatar api resorce -----------

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// -----------------avatar api close ----------

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://atifsupermart202199:FGzi4j6kRnYTIyP9@cluster0.bfulggv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function node() {
 try {
  
  
 } catch (error) {
  
 }
 
  
}
node();
async function run() {
  try {
    await client.connect();
    console.log('db connected');
    const productCollection = client.db('Esp32data').collection('espdata');
    const EspCollection = client.db('Esp32data').collection('espdata2');
 


 
   
   
    //     espdata display display
    // ----------------------------------------------------------------
    app.get('/api/esp32',   async(req, res) =>{
      const query = {};
      const cursor = EspCollection.find(query);
      const Data = await cursor.toArray();
      res.send(Data);
    }) 
    app.post('/api/esp32p', async (req, res) => {
      const accounts = req.body;
      const result = await EspCollection.insertOne(accounts);
      res.send(result)
    }); 
 

    app.get('/api/accounts/:id',   async(req, res) =>{
     const id = req.params.id;
     const query = {_id: ObjectId(id)};
     const booking = await EspCollection.findOne(query);
     res.send(booking);
    })
    
    app.get('/api/accounts', async (req, res) => {
      const query = {};
      const cursor = EspCollection.find(query);
      const accounts = await cursor.toArray();
      res.send(accounts);
    });
    app.get('/api/wholesale', async (req, res) => {
      const query = {};
      const cursor = wholesaleCollection.find(query);
      const accounts = await cursor.toArray();
      res.send(accounts);
    });
    app.get('/api/lotary', async (req, res) => {
      const query = {};
      const cursor = lotary.find(query);
      const Lotary = await cursor.toArray();
      res.send(Lotary);
    });
   

     // all post item
     app.post('/api/lotary', async (req, res) => {
      const nextcort = req.body;
      const result = await lotary.insertOne(nextcort);
      res.send(result)
    });
 
    app.get('/api/accountsreportbydate', async (req, res) => {
      const { sdate, edate } = req.query;
      console.log(sdate , edate); 
      const query = {};
      const cursor = EspCollection.find(query);
      const Accounts = await cursor.toArray();
      const startdate = new Date(sdate);
      const enddate = new Date(edate);
      const filterdate = Accounts.filter(a => {
        const date = new Date(a.Hisab_Date);
        return (date >= startdate && date <= enddate);
      }); 
      res.send(filterdate);
    });
     
  
    
 
  }
  finally {

  }

}
run().catch(console.dir);




app.get("/", (req, res) => {
  res.send(`<h1 style="text-align: center;
      color: red;"> Server is Running at <span style="color: Blue;">${port}</span></h1>`);
});

app.listen(port, () => {
  console.log("Atif super  mart server running at  : ", port);
});


 
 
