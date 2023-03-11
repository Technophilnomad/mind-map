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

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
