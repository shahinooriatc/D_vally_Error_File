import express from "express";
import Product from "../models/productModel.js";

const productRoutes = express.Router();

//----Get from MongoDbProduct Server to Backend--------//
productRoutes.get("/", async (req, res) => {
  let MongoDbProduct = await Product.find();
  res.send(MongoDbProduct);
 
});

//--Get Single Product---from MongoDbProduct----Server--//
productRoutes.get("/:slug", async (req, res) => {
  console.log(req.params.slug);

  let produ = await Product.find({ slug:req.params.slug});
  console.log(produ);

  // let product = await Product.find({});

  if (produ) {
    res.send(produ);
  } else {
    res.status(404).send({ msg: "Product not found" });
  }
});

//---Get CategoryWish---Product from Local faceData....without auto Id

// productRoutes.get("/:cat", async (req, res) => {


//   Product.findOne({"category": req.params.cat },(err,docs)=>{
//     res.send(docs)
//     console.log(docs);
//   })




  // let product = await Product.find({ category: req.params.cat });
  // console.log(product);
  // if (product) {
  //   res.send(product);
  // } else {
  //   res.status(404).send({ msg: "Product not found" });
  // }
// });



export default productRoutes;
