const { MongoClient, ServerApiVersion } = require(`mongodb`);
const uri = "mongodb+srv://farreldevara:LXONO4CzT2DERorp@farreldevara.ak09jjd.mongodb.net/?retryWrites=true&w=majority&appName=farreldevara";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const database = client.db("gc01")

module.exports = {database}
