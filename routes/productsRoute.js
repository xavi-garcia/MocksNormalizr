const express = require('express');
const MockProducts = require ('../Mocks/mockProducts');
const router = express.Router();

const mockProducts = new MockProducts();

router.get("/populate", (req, res) => {
  let response = mockProducts.populate(50);
  console.log(response);
});


router.get("/products", (req, res) => {
  res.json(mockProducts.getAllProducts());
});

module.exports = router;