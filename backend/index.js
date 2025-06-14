
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/bidhahub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const AdSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  category: String,
  location: String,
  email: String,
  image: String,
});

const Ad = mongoose.model('Ad', AdSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

app.get('/ads', async (req, res) => {
  const ads = await Ad.find();
  res.json(ads);
});

app.post('/ads', upload.single('image'), async (req, res) => {
  const ad = new Ad({
    ...req.body,
    image: req.file ? `/uploads/${req.file.filename}` : '',
  });
  await ad.save();
  res.status(201).json(ad);
});

app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
