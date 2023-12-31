const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lis7pde.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();



    const serviceCollection = client.db("carDoctor").collection("services")
    
app.get("/services", async(req,res)=>{
  const cursor =serviceCollection.find();
  const result = await cursor.toArray();
  res.send(result);
})




app.get("/services/:id",async(req,res)=>{
  const id = req.params.id;
  const query ={_id: new ObjectId(id)}



  const options = {
    // Sort matched documents in descending order by rating
    
    // Include only the `title` and `imdb` fields in the returned document
    projection: {  title: 1,  price: 1 },
  };

const result = await serviceCollection.findOne(query,options)
res.send(result);



})







// //get products
// // app.get('/getProducts/:id', async(req, res) => { 
// app.get('/getProducts', async(req, res) => { 
// const id = req.params.id;
// const query = {_id : new ObjectId(id)}
// // const result = await productCollection.findOne(query); 
// const result = await productCollection.find().toArray(); 
// res.send(result); 
// })

//     //post method
//     app.post("/addProducts", async (req, res) => {
//       const data = req.body;
//       // console.log(data);
//       const result = await productCollection.insertOne(data);
//       res.send(result);
//     });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("doctor is running");
});

app.listen(port, () => {
  console.log(`car doctor server is running on port ${port}`);
});
