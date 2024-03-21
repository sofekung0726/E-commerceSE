const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.model")
const verifyToken = require("../middleware/verifyToken")
const verifyAdmin = require("../middleware/verifyAdmin")

router.get("/" , async (req,res) => {
    try {
      const users = await UserModel.find();
          res.status(200).json(users)
    } catch (error) {
      res.status(500).json({message:error.message})
    }  
  })

  router.get("/:id", async (req,res) => {
    try {
      const {userId} = req.params.id
      const users = await ProductModel.findById(userId)
      if (!users) {
        return res.status(404).json({message:"User Not Found"})
      }
      res.status(200).json(users)
  
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  })

  router.post("/", async (req, res) => {
    const user = req.body;

    try {
        const existingUser = await UserModel.findOne({ email : user.email });

        if (existingUser) {
            // Update quantity if the cart already exists
            res.status(302).json({message : "User already exists"});
        } 
        if(!req.body.photoURL) {
            // Create a new cart if it doesn't exist
          req.body.photoURL = "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";
        }
        const newUser = new UserModel(user)
        await newUser.save();
            res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put("/:id" , async (req,res) => {
    const {id} = req.params.id
    const newUser = req.body
    try {
      const user = await UserModel.findByIdAndUpdate(req.params.id , req.body ,{new:true})
      if (!user) {
        return res.status(404).json({message:"User Not Found"})
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  })

  router.delete("/:id" , async (req,res) => {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id)
      if (!user) {
        return res.status(404).json({message:"User Not Found"})
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({message:error.message})
    }
  })

  // check this user is admin?
  router.get("/admin/:email" ,verifyToken, async (req,res) =>{
    try {
        const {email} = req.params;
        const user = await UserModel.findOne({email})
        let isAdmin = false;
        if (user.role === "admin") {
           isAdmin = true
        }
        res.status(200).json({isAdmin})
    } catch (error) {
        res.status(500).json({message:error.message})
      }
  })

  //change admin to user
  //patch is want to chang something ones not all can use patch
  router.patch("/user/:id" , verifyToken,verifyAdmin, async (req,res) => {
    try {
        const {id} = req.params
        const updateUser = await UserModel.findByIdAndUpdate(
            id,
            {
                role:"user"
            },
            {
                new:true , runValidators:true
            }
        )
        if (!updateUser) {
            return res.status(404).json({message:"User Not Found"})
        }
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
  })



  //change admin to user
  router.patch("/admin/:id" ,verifyToken,verifyAdmin, async (req,res) => {
    try {
        const {id} = req.params
        const updateUser = await UserModel.findByIdAndUpdate(
            id,
            {
                role:"admin"
            },
            {
                new:true , runValidators:true
            }
        )
        if (!updateUser) {
            return res.status(404).json({message:"User Not Found"})
        }
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
  })



module.exports = router