import Menu from "../models/menuModel.js";
import {v2 as cloudinary} from "cloudinary";

//add menu
export const addMenuItem=async(req,res)=>{
    try {
        const { name, description, price, category }= req.body;
        if (!name || !description || !price || !category  || !req.file) {
            return res
            .status(400)
            .json({ message: "All fields are required", success:false});
        }
        const result=await cloudinary.uploader.upload(req.file.path);
        
        const newMenuItem=await Menu.create({
            name,description,price,category,image:result.secure_url
        })
        res.status(201).json({
            message: "Menu item added",
            success: true,
            menuItem: newMenuItem, 
        });

    } catch (error) {
        console.log(error);
        return res.json({message:"Internal server error",success:false})
    }
}

//code for get all menu items
export const getAllMenuItems=async(req,res)=>{
    try {
        const menuItems=await Menu.find().populate("category","name").sort({createdAt:-1});
        res.status(200).json({ success:true, menuItems});

    } catch (error) {
        console.log(error);
        return res.json({message:"Internal server error",success:false})
    
    }
}


//update 
export const updateMenuItem=async(req,res)=>{
    try {
        const{ id } = req.params;
        const { name, description, price, category, isAvailable} = req.body;

        const menuItem=await Menu.findById(id);
        if (!menuItem)
        return res
        .status
        .json({message:"Menu item not found", success:false});

        if(req.file){
            const result=await cloudinary.uploader.upload(req.file.path);
            menuItem.image=result.secure_url;

         }
         if (name) menuItem.name = name;
         if(description)menuItem.description=description;
         if (price) menuItem.price=price;
         if (category) menuItem.category=category;
         if (isAvailable !== undefined) menuItem.isAvailable = isAvailable;
         

         await menuItem.save();
         res
         .status(200)
         .json({message:"menu item updated", success:true , menuItem});

    } catch (error) {
        console.log(error);
        return res.json({message:"Internal server error",success:false})
    
    }
}

//for deleteing
export const deleteMenuItem=async(req,res)=>{
    try {
        const {id}=req.params;
        const menuItem=await Menu.findByIdAndDelete(id);
        res
        .status(200)
        .json({message:"menu item deleted", success:true });

    } catch (error) {
        console.log(error);
        return res.json({message:"Internal server error",success:false})
    
    }
}