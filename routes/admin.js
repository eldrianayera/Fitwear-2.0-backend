const express = require("express");
const router = express.Router();
const pool = require("../db");

// add new product
router.post("/products", async (req, res) => {
  try {
    const { name, price, image, description, category } = req.body;
    const result = await pool.query(
      "INSERT INTO products (name, price, image, description, category) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, price, image, description, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// update product
router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image, description, category } = req.body;
    const result = await pool.query(
      "UPDATE products SET name=$1, price=$2, image=$3, description=$4, category=$5 WHERE id=$6 RETURNING *",
      [name, price, image, description, category, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//  delete product
router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
