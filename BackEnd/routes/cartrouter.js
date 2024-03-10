/**
 * @swagger
 * components:
 *  schemas:
 *    Cart:
 *          type: object
 *          required:
 *            -   productId
 *            -   name
 *            -   email
 *            -   image
 *            -   quantity
 *          properties:
 *            productId:
 *                type: string
 *                description:  The id  of  the cart item
 *            name:
 *                type: string
 *                description:  The price of  the product
 *            email:
 *                type:  string
 *                description:  The email of the user
 *            image:
 *                type: string
 *                description:  The image of  the product
 *            quantity:
 *                type: number
 *                description:  The quantity  of  the product
 *          example:
 *                productId:    654xxxxxxx
 *                name: "Macbook  Pro"
 *                email:  "example@example.com"
 *                image:  "http://example.come/macbook.jpg"
 *                quantity: 5
 * tags:
 *  name:  Cart
 *  description: the Cart  managing  API
 */

const express = require("express");
const router = express.Router();
const CartModel = require("../models/Cart.model");
const ProductModel = require("../models/Product.model")

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Retrieve  a list  of  cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *              application/json:
 *                schema:
 *                      type: array
 *                      items:
 *                            $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Some  error happened
 */

router.get("/", async (req, res) => {
  try {
    const cart = await CartModel.find();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /carts/{email}:
 *   get:
 *     summary: Get item in cart by  email
 *     tags: [Cart]
 *     parameters:
 *          -   in: path
 *              name: email
 *              required: true
 *              schema:
 *                  type: string
 *              description:  The email
 *     responses:
 *       200:
 *         description: The cart by  email.
 *         content:
 *              application/json:
 *                schema:
 *                      type: array
 *                      items:
 *                            $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Product Not Found  
 *       500:
 *         description: Some  error happened
 */

router.get("/:email", async (req, res) => {

  try {
    const userEmail = req.params.email
    const cart = await CartModel.find({ email : userEmail });
    if (!cart || cart.length === 0) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Create  new item in cart
 *     tags: [Cart]
 *     requestBody:
 *       required:  true
 *       content:
 *         application/json:
 *                schema:
 *                    $ref: '#/components/schemas/Cart'
 *     responses:
 *       201:
 *         description: The item cart is created.
 *         content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Some  error happened
 */

router.post("/", async (req, res) => {
  // ตรวจสอบว่า req.body มี property product_id หรือไม่
  if (!req.body.productId) {
    return res.status(400).json({ message: "Missing product_id in req.body" });
  }

  // ดึงข้อมูลผลิตภัณฑ์จากฐานข้อมูล
  try {
    const product = await ProductModel.findById(req.body.productId);
    const productId = product._id.toString();

    // ตรวจสอบว่ามีผลิตภัณฑ์
    if (req.body.productId !== productId) {
       return res.status(404).json({ message: "Product not found" });
    }

    const existingCart = await CartModel.findOne({ productId: req.body.productId });
    const existingCartByUser = await CartModel.findOne({ email: req.body.email });

    if (existingCart) {
      if (existingCartByUser) {
        // ถ้ามีข้อมูลใน Cart อยู่แล้ว และไม่มี Cart ที่อยู่ใน user นี้
        const quantity = Number(req.body.quantity);
        existingCart.quantity += quantity;
        await existingCart.save();
        return res.status(200).json(existingCart);
      }
    }

    // สร้าง CartsModel ด้วย req.body ที่ถูกส่งมา
    const newCart = new CartModel(req.body);

    // บันทึกลงในฐานข้อมูล
    const savedCart = await newCart.save();

    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /carts/{id}:
 *   put:
 *     summary: Update cart
 *     tags: [Cart]
 *     parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description:  The cart Id
 *     requestBody:
 *       required:  true
 *       content:
 *         application/json:
 *                schema:
 *                    $ref: '#/components/schemas/Cart'
 *     responses:
 *       201:
 *         description: The cart by  Id.
 *         content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart Not Found  
 *       500:
 *         description: Some  error happened
 */

router.put("/:id" , async (req,res) => {
    const {id} = req.params.id
    const newProduct = req.body
    try {
      const cart = await CartModel.findByIdAndUpdate(req.params.id , req.body ,{new:true})
      if (!cart) {
        return res.status(404).json({message:"Product Not Found"})
      }
      res.status(200).json(cart)
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  })
 /**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Delete cart
 *     tags: [Cart]
 *     parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description:  The cart Id
 *     responses:
 *       200:
 *         description: The Cart is  delete.
 *         content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart Not Found  
 *       500:
 *         description: Some  error happened
 */

  router.delete("/:id" , async (req,res) => {
    try {
      const cart = await CartModel.findByIdAndDelete(req.params.id)
      if (!cart) {
        return res.status(404).json({message:"Product Not Found"})
      }
      res.status(200).json(cart)
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  })
 /**
 * @swagger
 * /carts/clear/{email}:
 *   delete:
 *     summary: Delete cart
 *     tags: [Cart]
 *     parameters:
 *          -   in: path
 *              name: email
 *              required: true
 *              schema:
 *                  type: string
 *              description:  The cart Id
 *     responses:
 *       200:
 *         description: The Cart is  delete.
 *         content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart Not Found  
 *       500:
 *         description: Some  error happened
 */

  router.delete("/clear/:email", async (req, res) => {
    const { email } = req.params;

    try {
        const clearCart = await CartModel.deleteMany({ email });

        if (clearCart.deletedCount > 0) {
            return res.status(200).json({ message: "Cart item have "+ clearCart.deletedCount + " is deleted" });

        }

        res.status(404).json({ message: "No cart found for this email" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
