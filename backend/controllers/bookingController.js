import Booking from "../models/bookingModel.js";

//function for user booking table
export const createBooking=async(req,res)=>{
    try {

        const {id}=req.user;
        const {name, phone, numberOfPeople, date, time, note } = req.body;
        if (!name || !phone || !numberOfPeople || !date || !time){
            return res.status(400).json({message:"All feilds are required", success:false});
        }

        //checking for overlapping bookings
        const existingBooking=await Booking.findOne({
            date,time,
            status:{$ne:"Cancelled"} // ne mean not equal
        });

        if (existingBooking)
            return res
            .status(400)
            .json({message:"This time slot is already booked", success:false});

            const booking=await Booking.create({
                user:id,
                name,phone,numberOfPeople,date,time,note
            });
            res
            .status(201)
            .json({message:"Table booked successfully", success:true, booking});

    } catch (error) {
         console.log(error);
        return res.json({message:"Internal server error",success:false})

    }
}

//function for user booking(for user)
export const getUserBooking=async(req,res)=>{
    try {
        const {id}=req.user;
        const bookings=await Booking.find({user:id}).sort({createdAt:-1,});
        res.status(200).json(bookings);

    } catch (error) {
          console.log(error);
        return res.json({message:"Internal server error",success:false})

    }
}

//function for all booking(for admin)
export const getAllBookings=async(req,res)=>{
    try {
        const bookings=await Booking.find().populate("user","name email")
        res.status(200).json({bookings,success:true});

    } catch (error) {
         console.log(error);
        return res.json({message:"Internal server error",success:false})

    }
}

//function for admin can change the status of booking
export const updateBookingStatus=async(req,res)=>{
    try {
        const {bookingId}=req.params;
      
        const {status}=req.body;
        const booking=await Booking.findById(bookingId);
        if (!booking)
            return res.status(404).json({message:"Booking not found"});
        booking.status=status; //booking status equal kar rahe hai jo body se aa raha hai dure status me
        await booking.save();
        res
        .status(200)
        .json({message:"Booking status updated",success: true,booking});

    } catch (error) {
        console.log(error);
        return res.json({message:"Internal server error",success:false})

    }
}