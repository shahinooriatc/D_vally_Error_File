import data from "./E-commerceAPI.js";
import discount from "./discount.js";
import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import rootRoutes from "./routes/rootRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import product from "./models/productModel.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoUrl = process.env.mongo_url;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("mongodb connect successfully Done");
  })
  .catch((err) => {
    console.log("mongodb connect error", err);
  });

// Post All UserData frontend to Backend--------//
app.use("/api", rootRoutes);

// Post All ProductData frontend to Backend--------//
app.use("/api", rootRoutes);

// Post All Orders Data frontend to Backend--------//
app.use("/api/orders", ordersRoutes);

// Post individual registeredUser user from Frontend to Backend--------
app.use("/api/user", userRoutes);

//--------Get Data from Backend----------//
app.use("/products", productRoutes);

// //--------Get Data from Backend----------//
// app.use("/", productRoutes);

// Get individual user from Backend--------
app.use("/api/user", userRoutes);

//---Get Id_Wish Data from Backend------
app.get("/productcart/:id", (req, res) => {
  let product = data.find((item) => {
    if (req.params.id == item._id) {
      return item;
    }
  });
  res.send(product);
});

//---Get CategoryWish---Product from MongoDbProduct-Server--to Frontend//
app.get("/:cat", async (req, res) => {
  product.find({ category: req.params.cat }, (err, docs) => {
    res.send(docs);
  });
});

app.get("/discount", (req, res) => {
  res.send(discount);
});

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT || "sb");
});

//Post Listening  Section............
let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
