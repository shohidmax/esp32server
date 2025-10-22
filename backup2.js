const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId, ISODate } = require('mongodb');
const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://atifsupermart202199:FGzi4j6kRnYTIyP9@cluster0.bfulggv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    console.log('db connected');
    const productCollection = client.db('atifdatamax').collection('product');
    const productsCollection = client.db('atifdatamax').collection('products');
    const brandCollection = client.db('atifdatamax').collection('brand');
    const supplierCollection = client.db('atifdatamax').collection('supplier');
    const groupCollection = client.db('atifdatamax').collection('group');
    const ssrCollection = client.db('atifdatamax').collection('ssr');
    const shopCollection = client.db('atifdatamax').collection('shop');
    const SaleCollection = client.db('atifdatamax').collection('sale');
    const HoldCollection = client.db('atifdatamax').collection('hold');
    const proddCollection = client.db('atifdatamax').collection('prodd');
      // account temporary code for atif super mart
      const accountsCollection = client.db('atifdatamax').collection('accounts');
      const bankCollection = client.db('atifdatamax').collection('bank');
      const noteCollection = client.db('atifdatamax').collection('note');
      const costCollection = client.db('atifdatamax').collection('Cost');
      const dueCollection = client.db('atifdatamax').collection('Due');
      const addMoneyCollection = client.db('atifdatamax').collection('addMoney');
      const todaysaleCollection = client.db('atifdatamax').collection('todaysale');
      const todayrestCollection = client.db('atifdatamax').collection('restamound');
      const nestcortCollection = client.db('atifdatamax').collection('nestcort');


       // Delete all data from the MongoDB collection
    app.get('/api/delete', async (req, res) => {
      const result = await bankCollection.deleteMany({});
      const result2 = await noteCollection.deleteMany({});
      const result3 = await costCollection.deleteMany({});
      const result4 = await dueCollection.deleteMany({});
      const result5 = await addMoneyCollection.deleteMany({});
      const result6 = await todaysaleCollection.deleteMany({});
      const result7 = await todayrestCollection.deleteMany({});
      const result8 = await nestcortCollection.deleteMany({});
      res.send(result);
    });
    app.get('/api/v3/finalsubmit', async(req, res) =>{

      const d = new Date("2021-03-25");
        d.getFullYear();
      res.send('your data submitted ,,,,,,,,,', d)
    })
    app.post('/api/v3/finalsubmit', async (req, res) => {
      const accounts = req.body;
      const result = await accountsCollection.insertOne(accounts);
      res.send(result)
    });
    //     api making 
    //     product display
    // ----------------------------------------------------------------

    app.get('/accounts', async (req, res) => {
      const query = {};
      const cursor = accountsCollection.find(query);
      const accounts = await cursor.toArray();
      res.send(accounts);
    });
    app.get('/bank', async (req, res) => {
      const query = {};
      const cursor = bankCollection.find(query);
      const bank = await cursor.toArray();
      res.send(bank);
    });
    app.get('/note', async (req, res) => {
      const query = {};
      const cursor = noteCollection.find(query);
      const note = await cursor.toArray();
      res.send(note);
    });
    app.get('/cost', async (req, res) => {
      const query = {};
      const cursor = costCollection.find(query);
      const cost = await cursor.toArray();
      res.send(cost);
    });
    app.get('/due', async (req, res) => {
      const query = {};
      const cursor = dueCollection.find(query);
      const due = await cursor.toArray();
      res.send(due);
    });
    app.get('/addmoney', async (req, res) => {
      const query = {};
      const cursor = addMoneyCollection.find(query);
      const due = await cursor.toArray();
      res.send(due);
    });
    app.get('/todaysale', async (req, res) => {
      const query = {};
      const cursor = todaysaleCollection.find(query);
      const todaysale = await cursor.toArray();
      res.send(todaysale);
    });
    app.get('/todayrestamound', async (req, res) => {
      const query = {};
      const cursor = todayrestCollection.find(query);
      const todayrest = await cursor.toArray();
      res.send(todayrest);
    });
    app.get('/nextcort', async (req, res) => {
      const query = {};
      const cursor = nestcortCollection.find(query);
      const nextcort = await cursor.toArray();
      res.send(nextcort);
    });






     // all post item
     app.post('/nextcort', async (req, res) => {
      const nextcort = req.body;
      const result = await nestcortCollection.insertOne(nextcort);
      res.send(result)
    });
     app.post('/todaysale', async (req, res) => {
      const todaysale = req.body;
      const result = await todaysaleCollection.insertOne(todaysale);
      res.send(result)
    });
     app.post('/todayrestamound', async (req, res) => {
      const todayrest = req.body;
      const result = await todayrestCollection.insertOne(todayrest);
      res.send(result)
    });
     app.post('/accounts', async (req, res) => {
      const accounts = req.body;
      const result = await accountsCollection.insertOne(accounts);
      res.send(result)
    });
    app.post('/bank', async (req, res) => {
      const bank = req.body;
      const result = await bankCollection.insertOne(bank);
      res.send(result) 
    });
    app.post('/note', async (req, res) => {
      const note = req.body;
      const result = await noteCollection.insertOne(note);
      res.send(result)
    });
    app.post('/cost', async (req, res) => {
      const cost = req.body;
      const result = await costCollection.insertOne(cost);
      res.send(result)
    });
    app.post('/due', async (req, res) => {
      const due = req.body;
      const result = await dueCollection.insertOne(due);
      res.send(result)
    });
    app.post('/addmoney', async (req, res) => {
      const due = req.body;
      const result = await addMoneyCollection.insertOne(due);
      res.send(result)
    });









    // delete one 
    app.delete('/nextcort/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await nestcortCollection.deleteOne(query);
      res.send(result);
    })
    app.delete('/addmoney/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await addMoneyCollection.deleteOne(query);
      res.send(result);
    })
    app.delete('/bank/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bankCollection.deleteOne(query);
      res.send(result);
    })
    app.delete('/cost/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await costCollection.deleteOne(query);
      res.send(result); 

    })
    app.delete('/accounts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await accountsCollection.deleteOne(query);
      res.send(result); 

    })
    app.delete('/note/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await noteCollection.deleteOne(query);
      res.send(result); 

    })
    app.delete('/due/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await dueCollection.deleteOne(query);
      res.send(result); 

    })
    app.delete('/todaysale/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await todaysaleCollection.deleteOne(query);
      res.send(result); 

    })
    app.delete('/todayrestamound/:id', async (req, res) => { 
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await todayrestCollection.deleteOne(query);
      res.send(result); 

    })
 
    // Delete all data from the MongoDB collection
    app.get('/api/delete', async (req, res) => {
        const result = await dueCollection.deleteMany({});
        res.send(result);
    });
    //-----------------------------------------------------------------

    app.get('/product', async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const product = await cursor.toArray();
      res.send(product);
    });
    app.get('/products', async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const produ = await cursor.toArray();
      res.send(produ);
    });
    app.get('/group', async (req, res) => {
      const query = {};
      const cursor = groupCollection.find(query);
      const product = await cursor.toArray();
      res.send(product);
    });
    app.get('/brand', async (req, res) => {
      const query = {};
      const cursor = brandCollection.find(query);
      const product = await cursor.toArray();
      res.send(product);
    });
    app.get('/supplier', async (req, res) => {
      const query = {};
      const cursor = supplierCollection.find(query);
      const product = await cursor.toArray();
      res.send(product);
    });
    app.get('/ssr', async (req, res) => {
      const query = {};
      const cursor = ssrCollection.find(query);
      const ssr = await cursor.toArray();
      res.send(ssr);
    });
    app.get('/shop', async (req, res) => {
      const query = {};
      const cursor = shopCollection.find(query);
      const shop = await cursor.toArray();
      res.send(shop);
    });
    app.get('/sale', async (req, res) => {
      const query = {};
      const cursor = SaleCollection.find(query);
      const shop = await cursor.toArray();
      res.send(shop);
    });
    app.get('/hold', async (req, res) => {
      const query = {};
      const cursor = HoldCollection.find(query);
      const hold = await cursor.toArray();
      res.send(hold);
    });
    app.get('/prod', async (req, res) => {
      const query = {};
      const cursor = proddCollection.find(query);
      const hold = await cursor.toArray();
      res.send(hold);
    });
    app.get('/invoicenumber', async (req, res) => { 
      // const array1 = [5,7,9, 11];
      // console.log(array1[array1.length -1]);
      const query = {};
      const cursor = SaleCollection.find(query);
      const sale = await cursor.toArray();
      res.send(sale);
    });

    // get damage speacific product
    app.get('/damage-stock-update/:id', async (req, res) => {
      const id = req.params.id;
      const querys = {};
      const cursor = productsCollection.find(querys);
      const produ = await cursor.toArray();
      const getSerarchProduct = produ.find((p) => p.BarCode == id);
      res.send(getSerarchProduct);
    })
    app.get('/hold/:id', async (req, res) => {
      const id = req.params.id;
      const querys = {};
      const cursor = HoldCollection.find(querys);
      const produ = await cursor.toArray();
      const getSerarchProduct = produ.find((p) => p.Hold_ID == id); 
      res.send(getSerarchProduct);
      const query = { _id: ObjectId(getSerarchProduct._id) };
      const result = await HoldCollection.deleteOne(query);
    }) 

    //  filter datat between tow date 
    app.get('/datefilter', async (req, res) => {
      const { sdate, edate } = req.query;
      // console.log(sdate , edate);
      // const query = {};
      // const cursor = SaleCollection.find(query);
      // const shop = await cursor.toArray(cursor);
      const query = {};
      const cursor = SaleCollection.find(query);
      const shop = await cursor.toArray();
      
      const startdate = new Date(sdate);
      const enddate = new Date(edate);
      const filterdate = shop.filter(a => {
        const date = new Date(a.date);
        return (date >= startdate && date <= enddate);
      }); 
      res.send(filterdate);
    });



    // get with speacific product stock
    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const booking = await productsCollection.findOne(query);
      res.send(booking);
    })

    app.put('/handleAddToDamage/:id', async (req, res) => {
      const id = req.params.id;
      const updatedStock = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          Damage_Quntity: updatedStock.reStock
        }
      };
      const result = await productsCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    });


//,,,,,,,,,,,,saju vai due drop,,,,,,,,,,,,,,,,,, 01648211024

 

    // -------------------------------------------------------------sale ------
    app.put('/finalsale', async (req, res) => {
      // const id = req.params.id; 
      const updatedStock = req.body;
      const arry = updatedStock.Sale_Data; 
      const query = {};
      const cursor = SaleCollection.find(query);
      const sale = await cursor.toArray();

      console.log(updatedStock.Sale_Date);
      const sdate = await new Date(updatedStock.Sale_Date);
      const edate = await new Date(updatedStock.Sale_Date);
      const filterdate = await sale.filter(a => {
        const date = new Date(a.date);
        return (date >= sdate && date <= edate);
      });
      console.log(filterdate, '/////////////////');
 
      let invoice_list = [];
      //------------------------------------
        for await (const inv of sale){
          invoice_list=[...invoice_list, inv.Sale_Invoice.slice(-5)]
           console.log(inv.Sale_Invoice.slice(-5));
        }
        const new_inv_num = (Math.max(...invoice_list) + 1).toString();
        const chng = updatedStock.Sale_Invoice.slice(-5)
        updatedStock.Sale_Invoice = updatedStock.Sale_Invoice.replace(chng, new_inv_num)
      //------------------------------------

      for await (const pro of arry) {
        const ID = pro._id;
        // console.log(pro._id, pro.StockQty - pro.orderq, pro);
        const update = pro.StockQty - pro.orderq;
        const filter = { _id: ObjectId(ID) };
        const options = { upsert: true };
        const updatedDoc = {
          $set: {
            StockQty: update
          }
        };
        const result = await productsCollection.updateOne(filter, updatedDoc, options);
        console.log(result);
      }
      // ---------------------------------------------- for  update  --------------
      const result = await SaleCollection.insertOne(updatedStock);

      // ---------------------------- update close ---------------------------------- 
      res.send({ 'data': 'succesfully data updated',updatedStock ,result,invoice_list});
    })



    // .....object data ........................................................................................................
    const productdata = {
      "_id": "633f4e807784639f332e3b62",
      "Supplier_Name": "EGG",
      "BarCode": 111111,
      "Group": "MILK & DAIRY PRODUCTS",
      "Product": "EGG",
      "Brand": "EGG",
      "Style": "BROWN EGG 1PCS",
      "Stock_Qty": 0,
      "StockQty": 124,
      "CPU": 11.19,
      "CPU_Value": 0,
      "RPU": 12,
      "RPU_Value": 0,
      "Damage_Quntity": 0,
      "Comment": 0,
      "Status": "active"
    };


    // add brand 

    app.post('/brand', async (req, res) => {
      const newBrand = req.body; 
      const result = await brandCollection.insertOne(newBrand);
      res.send(result)
    });

    app.post('/sale', async (req, res) => {
      const newSale = req.body; 
      const result = await SaleCollection.insertOne(newSale);
      res.send(result)
    });

    // add supplier 
    app.post('/supplier', async (req, res) => {
      const newSSR = req.body; 
      const result = await supplierCollection.insertOne(newSSR);
      res.send(result)
    });

    // add ssr 
    app.post('/ssr', async (req, res) => {
      const newSSR = req.body; 
      const result = await ssrCollection.insertOne(newSSR);
      res.send(result)
    });

    // add ssr 
    app.post('/shop', async (req, res) => {
      const newshop = req.body; 
      const result = await shopCollection.insertOne(newshop);
      res.send(result)
    });

    // add ssr 
    app.post('/holddata', async (req, res) => {
      const Holddata = req.body; 
      const result = await HoldCollection.insertOne(Holddata);
      res.send(result)
    });

    //   search api
    const rolll = {
      "_id": "633f4e807784639f332e3afc",
      "Supplier_Name": "DANISH FOOD LTD.",
      "BarCode": 8941152000307,
      "Group": "SNAKS & COOKIES",
      "Product": "BISCUIT",
      "Brand": "DANISH",
      "Style": "DOREO 4 PACK",
      "Stock_Qty": 0,
      "StockQty": 6,
      "CPU": 88,
      "CPU_Value": 0,
      "RPU": 110,
      "RPU_Value": 0,
      "Damage_Quntity": 9,
      "Comment": 0,
      "Status": "active"
    };


    app.get('/search/:target', async (req, res) => {
      let q = req.params;
      // console.log(q);
      let result = await productsCollection.find({
        "$or": [

          {
            Group: { $regex: req.params.target }
          },
          {
            Product: { $regex: req.params.target }
          },
          {
            Brand: { $regex: req.params.target }
          },
          {
            Style: { $regex: req.params.target }
          },
          {
            BarCode: { $regex: req.params.target }
          },
        ]
      });
      let rest = await result.toArray();
      // console.log(rest);
      res.send(rest);
    });


    app.get('/shoppurchase', async (req, res) => {
      const { supp, barcode } = req.query;
      // console.log({ supp, barcode });
      let result = await productsCollection.find({
        "$or": [
          {
            Supplier_Name: { $regex: supp }
          }
        ]
      });
      let rest = await result.toArray();
      const final = await rest.find(r => r.BarCode.toString() === barcode.toString());
      if (final) {
        res.send(final);
      } else {
        res.send({ data: 'data not found' });
      }
    });

    // deleting item
    app.delete('/brand/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await brandCollection.deleteOne(query);
      res.send(result);
    })
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


 

//  function previous_year_artist(req, res, next) {
//         var dateTimeTofilter = moment().subtract(1, 'year');
//         var filter = {
//             "date_added": {
//                 $gte: new Date(dateTimeTofilter._d)
//             }
//         };
//         db.collection.find(
//             filter
//         ).toArray(function(err, result) {
//             if (err) return next(err);
//             res.send(result);
//         });

//     }