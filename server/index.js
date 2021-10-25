const express = require("express");
const cors = require("cors");
const { GOODS_PATH, CART_PATH } = require("./constants");
const { addToCart, removeFromCart } = require("./commonFunctions");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("./static"));

app.patch("/add", (req, res) => {
  addToCart(CART_PATH, req.body.id).then((cart) => {
    res.setHeader("Content-type", "application/json");
    res.send(cart);
  });
});

app.delete("/delete", (req, res) => {
  removeFromCart(CART_PATH, req.body.id).then((cart) => {
    res.setHeader("Content-type", "application/json");
    res.send(cart);
  });
});

app.listen("8080", () => {
  console.log("Server is running on port 8080!");
});
