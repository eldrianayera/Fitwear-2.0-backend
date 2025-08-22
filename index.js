const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productsRouter = require("./routes/products");
const adminRouter = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// API routes
app.use("/api/products", productsRouter);
app.use("/api/admin", adminRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
