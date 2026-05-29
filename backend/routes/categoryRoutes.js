import express from "express";

import {adminOnly} from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js"
import { addCategory, deleteCatgeory, getAllCategories, updateCategory } from "../controllers/categoryController.js";
const categoryRoutes=express.Router();


categoryRoutes.post("/add",adminOnly,upload.single("image"),addCategory)
categoryRoutes.put("/update/:id",adminOnly,upload.single("image"),updateCategory)
categoryRoutes.delete("/delete/:id",adminOnly,deleteCatgeory)
categoryRoutes.get("/all",getAllCategories);


export default categoryRoutes;