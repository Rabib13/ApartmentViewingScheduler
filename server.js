const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/apartment-viewing', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const slotSchema = new mongoose.Schema({
  time: String,
  booked: Boolean,
  name: String,
  email: String
});

const Slot = mongoose.model('Slot', slotSchema);

app.get('/slots', async (req, res) => {
  const slots = await Slot.find();
  res.json(slots);
});

app.post('/slots', async (req, res) => {
  const { time } = req.body;
  const newSlot = new Slot({ time, booked: false });
  await newSlot.save();
  res.json(newSlot);
});

app.put('/slots/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const updatedSlot = await Slot.findByIdAndUpdate(id, { booked: true, name, email }, { new: true });
  res.json(updatedSlot);
});

app.delete('/slots/:id', async (req, res) => {
  const { id } = req.params;
  await Slot.findByIdAndDelete(id);
  res.json({ message: 'Slot deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
