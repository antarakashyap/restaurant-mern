import Category from "../models/categoryModel.js";
import Menu from "../models/menuModel.js";
import Order from "../models/orderModel.js";
import Booking from "../models/bookingModel.js";

export const getDashboardData = async (req, res) => {
  try {
    const totalCategories = await Category.countDocuments();
    const totalMenus = await Menu.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const recentOrders = await Order.find()
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5);
      const pendingOrders = await Order.countDocuments({
      status: "Pending",
         });

        const deliveredOrders = await Order.countDocuments({
         status: "Delivered",
     });
      
    const topSellingDishes = await Order.aggregate([
  { $unwind: "$items" },

  {
    $group: {
      _id: "$items.menuItem",
      totalOrders: { $sum: "$items.quantity" }
    }
  },

  { $sort: { totalOrders: -1 } },

  { $limit: 5 },

  {
    $lookup: {
      from: "menus",
      localField: "_id",
      foreignField: "_id",
      as: "menu"
    }
  },

  { $unwind: "$menu" },

  {
    $project: {
      name: "$menu.name",
      image: "$menu.image",
      totalOrders: 1
    }
  }
]);

    res.json({
  success: true,
  totalCategories,
  totalMenus,
  totalOrders,
  totalBookings,
  totalRevenue:
    totalRevenue.length > 0
      ? totalRevenue[0].revenue
      : 0,

  pendingOrders,
  deliveredOrders,
  recentOrders,
  recentBookings,
  topSellingDishes,
});
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};