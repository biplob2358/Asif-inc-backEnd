const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;


const app = express();

//middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yjf8p4x.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const employeeDataCollection = client.db('asifInc').collection('employeeData');

        app.post('/employee', async (req, res) => {
            const employee = req.body;
            const result = await employeeDataCollection.insertOne(employee);
            res.send(result);
        })

        app.get('/allemployee', async (req, res) => {
            const query = {};
            const result = await employeeDataCollection.find(query).toArray();
            res.send(result)
        });
        app.delete('/allemployee/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await employeeDataCollection.deleteOne(filter);
            res.send(result)
        })

    }
    finally {

    }
}
run().catch(console.log);

app.get('/', async (req, res) => {
    res.send('Asif Inc server is running');
})

app.listen(port, () => console.log(`Asif inc rinning on ${port}`))