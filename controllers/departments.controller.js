//departments.controller.js

const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Department.find({}));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count); // we draw a number, but one that will not be greater than the number of documents.
    const dep = await Department.findOne().skip(rand); // 'skip' allows omitting any number of documents when searching. Here it assures that the search will start from a different location everytime, e.g if rand = 100, the 100th element will be returned.
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found...' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save(); // under the hood 'save' uses 'insertOne'
    res.json({ message: 'OK' });
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }

  // alternative version with promises:
  /* 
  const { name } = req.body;
  const newDepartment = new Department({ name });
  newDepartment.save()
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch(err => {
      res.status(500).json({ message: err });
    }); */
};

exports.putOneById = async (req, res) => {
  
  try {
    const { name } = req.body;
    const dep = await Department.findById(req.params.id);
    if(dep) {
      dep.name = name;
      await dep.save();
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if(dep) {
      await Department.deleteOne({ _id: req.params.id });
      res.json(dep);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err){
    res.status(500).json({ message: err });
  }
};
