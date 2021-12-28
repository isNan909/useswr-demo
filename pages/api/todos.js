// Import Dependencies
import { connectToDatabase } from '../lib/database';

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const db = await connectToDatabase();
    const collection = await db.collection('todos');
    const todos = await collection.find({}).toArray();
    res.status(200).json({ todos });
  } else if (req.method === 'POST') {
    const newtodo = req.body;
    const db = await connectToDatabase();
    const collection = await db.collection('todos');
    const todos = await collection.insertOne(newtodo);
    res.status(200).json({ todos, status: 'API called sucessfully' });
  } else {
    res.status(404).json({ status: 'Error route not found' });
  }
};
