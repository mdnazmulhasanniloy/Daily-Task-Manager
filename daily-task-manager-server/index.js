const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 2000 ;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pyj8wdj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// jwt verification function
const verifyJwt = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('unAuthorize access')
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'forbidden access' })
        }
        req.decoded = decoded;
        next();
    })

}

//db connection

const run = async() =>{
    try{


        //database table
        const userCollection = client.db("daily-task-manager").collection("users");
        const tasksCollection = client.db("daily-task-manager").collection("allTask");
        



 
          // jwt api
        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const user = await userCollection.findOne(query);
            if (user) {
                const token = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
                return res.send({ accessToken: token });
            }
            return res.status(403).send({ accessToken: '' })


        })



        app.post('/users', async(req, res) =>{
            const data = req.body;
            const result = await userCollection.insertOne(data);
            res.send(result)
        });

        app.get('/allTask', async(req, res) =>{
            const query = {}
            const result = await tasksCollection.find(query).toArray();
            res.send(result);
        });

            // add new task
        app.post('/addTask', verifyJwt, async(req, res) =>{
            const decodedEmail = req.decoded.email;
            const decodedQuery = { email: decodedEmail }
            const user = await userCollection.findOne(decodedQuery);
            if (!user) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            
            const data = req.body;
            const result = await tasksCollection.insertOne(data);
            res.send(result)
        });
            // get task using email
        app.get('/myTask', async(req, res) =>{
            const email = req.query.email;
            const query = { email: email, complete: false }
            const result = await tasksCollection.find(query).toArray();
            res.send(result)
        });

        // delete task
        app.delete('/myTask/delete/:id', verifyJwt, async(req, res) =>{
            const decodedEmail = req.decoded.email;
            const decodedQuery = { email: decodedEmail }
            const user = await userCollection.findOne(decodedQuery);
            if (!user) {
                return res.status(403).send({ message: 'forbidden access' })
            }


            const id = req.params.id;
            const userQuery = {
                _id: ObjectId(id)
            }

            const result = await tasksCollection.deleteOne(userQuery);
            res.send(result);
        });

        // Complete task
        app.put('/task/update/:id', verifyJwt, async (req, res) => { 
            const decodedEmail = req.decoded.email;
            const decodedQuery = { email: decodedEmail }
            const user = await userCollection.findOne(decodedQuery);
            if (!user) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    complete: true
                }
            }
            const result = await tasksCollection.updateOne(filter, updatedDoc, options);
            res.send(result)


        });

              // get task using email
              app.get('/CompleteTask', async(req, res) =>{
                const email = req.query.email;
                const query = { email: email, complete: true }
                const result = await tasksCollection.find(query).toArray();
                res.send(result)
            });



        // Not Complete task
        app.put('/task/notComplete/:id', verifyJwt, async (req, res) => { 
            const decodedEmail = req.decoded.email;
            const decodedQuery = { email: decodedEmail }
            const user = await userCollection.findOne(decodedQuery);
            if (!user) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    complete: false
                }
            }
            const result = await tasksCollection.updateOne(filter, updatedDoc, options);
            res.send(result)


        });


        app.post('/MyTask/updateTask/:id', (req, res) => {
            const id = req.params.id;
            const updatedTask = req.body;
            console.log(updatedTask)
        });

        app.patch('/updateTask/:id', async(req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                        $set: {
                            task: data.task
                        }
                    }
            const result = await tasksCollection.updateOne(filter, updatedDoc, options);
            res.send(result)

        });


    }
    finally{

    }
}
run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('Hello Niloy');
});



app.listen(port, ()=>{
    console.log( `simple server running on prot ${port}`);
})
