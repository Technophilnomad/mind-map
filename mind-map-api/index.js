const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// connect to MongoDB
mongoose.connect('mongodb://localhost/mindmap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

// define node schema
const nodeSchema = new mongoose.Schema({
  title: String,
  content: String,
  parent: String,
});

const Node = mongoose.model('Node', nodeSchema);

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// CORS preflight middleware
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.send();
});


// parse JSON requests
app.use(bodyParser.json());

// API endpoint to create a new node
app.post('/api/nodes', async (req, res) => {
  const { title, content, parent } = req.body;

  try {
    const node = new Node({ title, content, parent });
    await node.save();
    res.status(201).json(node);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating node');
  }
});

// API endpoint to get all nodes
app.get('/api/nodes', async (req, res) => {
  try {
    const nodes = await Node.find();
    res.json(nodes);
    console.log("fetched details of nodes")
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving nodes');
  }
});

// API endpoint to update a node
app.put('/api/nodes/:id', async (req, res) => {
  const { title, content, parent } = req.body;
  const { id } = req.params;

  try {
    const node = await Node.findByIdAndUpdate(id, { title, content, parent }, { new: true });
    res.json(node);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating node');
  }
});

// API endpoint to delete a node
app.delete('/api/nodes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Node.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting node');
  }
});

// API endpoint to check health and Database connection
app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    const healthStatus = { status: 'ok', database: dbStatus };
    res.json(healthStatus);
    console.log(healthStatus)
});

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
