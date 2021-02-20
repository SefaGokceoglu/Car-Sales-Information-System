const router = require("express").Router();
const Dealer = require("../models/dealer.model");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

router.get("/:token", async (req, res) => {
  const id = jwt.verify(req.params.token, process.env.JWT_PASSWORD).id;

  const dealers = await Dealer.find({ createdBy: id });
  res.json(dealers);
});

router.post("/:token", async (req, res) => {
  const id = await jwt.verify(req.params.token, process.env.JWT_PASSWORD).id;

  const { city,district, adress, name, lastname,phone } = req.body;

  if (!city || !adress || !name || !lastname || !district) {
    return res.status(400).json({ msg: "Please enter all needed areas " });
  }

  const newDealer = new Dealer({
    city,
    district,
    adress,
    manager: {
      name,
      lastname,
      phone
    },
    createdBy: id,
  });

  const savedDealer = await newDealer.save();

  res.json(savedDealer);
});

router.patch("/:token/:_id", async (req, res) => {
  const user_id = await jwt.verify(req.params.token, process.env.JWT_PASSWORD)
    .id;
  const dealer_id = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(dealer_id)) {
    return res.status(400).json({ msg: "This Dealer doesnt exist " });
  }
  const { city, district, adress, name, lastname,phone } = req.body;

  
  if (!city || !adress || !name || !lastname || !district) {
    return res.status(400).json({ msg: "Please enter all needed areas " });
  }

  const updatedDealer = await Dealer.findByIdAndUpdate(
    dealer_id,
    {
      city,
      district,
      adress,
      manager: {
        name,
        lastname,
        phone
      },
      createdBy: user_id,
    },
    { new: true, useFindAndModify: false }
  ).catch((err) => {
    console.log(err);
  });

  res.json(updatedDealer);
});

router.delete("/:token/:_id", async (req, res) => {
  const user_id = await jwt.verify(req.params.token, process.env.JWT_PASSWORD)
    .id;
  const dealer_id = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(dealer_id)) {
    return res.status(400).json({ msg: "This Dealer doesnt exist " });
  }

  const deletedDealer = await Dealer.findByIdAndRemove(dealer_id).catch((err) => {
    console.log(err);
  });

  res.json(deletedDealer);
});

module.exports = router;
