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

router.get("/", async (req, res) => {
  try {
    const cart = await CartModel.find();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const cart = await CartModel.findById({ email });
    if (!cart) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
    const cart = req.body;

    try {
        const existingCart = await CartModel.findOne({ productId: cart.productId, email: cart.email });

        if (existingCart) {
            // Update quantity if the cart already exists
            existingCart.quantity += cart.quantity;
            await existingCart.save();
            res.status(200).json(existingCart);
        } else {
            // Create a new cart if it doesn't exist
            const newCart = new CartModel(cart);
            await newCart.save();
            res.status(201).json(newCart);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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
