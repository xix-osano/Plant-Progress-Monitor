const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');
const multer = require('multer');
const path = require('path');

// Setup Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Images will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// @route   GET api/plants
// @desc    Get all plants
// @access  Public
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 });
    res.json(plants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/plants
// @desc    Add a new plant with an initial image
// @access  Public
router.post('/', upload.single('image'), async (req, res) => {
  const { name } = req.body;
  let imageUrl = req.body.imageUrl; // If passing URL directly

  // If an image file was uploaded, use its path
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }

  if (!name || !imageUrl) {
    return res.status(400).json({ msg: 'Please enter plant name and image URL/file' });
  }

  try {
    const newPlant = new Plant({
      name,
      images: [{ imageUrl }],
    });

    const plant = await newPlant.save();
    res.status(201).json(plant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/plants/:id/images
// @desc    Add a new image to an existing plant
// @access  Public
router.put('/:id/images', upload.single('image'), async (req, res) => {
  let imageUrl = req.body.imageUrl; // If passing URL directly

  // If an image file was uploaded, use its path
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }

  if (!imageUrl) {
    return res.status(400).json({ msg: 'Please provide an image URL or upload a file' });
  }

  try {
    let plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ msg: 'Plant not found' });
    }

    plant.images.push({ imageUrl });
    await plant.save();
    res.json(plant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;