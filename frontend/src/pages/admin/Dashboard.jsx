import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

import {
   Plus,
  Package,
  ShoppingCart,
  CalendarDays,
  BarChart3,
  ClipboardCheck,
  Clock3,
  CheckCircle2,
  IndianRupee,
  ShoppingBag,
  UtensilsCrossed,
  FolderTree,
 
} from "lucide-react";

const Dashboard=()=>{
const { axios, admin } = useContext(AppContext);
const navigate = useNavigate();

const [stats, setStats,] = useState({
  totalCategories: 0,
  totalMenus: 0,
  totalOrders: 0,
  totalBookings: 0,
  totalRevenue: 0,
  pendingOrders: 0,
  deliveredOrders: 0,
});
const [topSellingDishes, setTopSellingDishes] = useState([]);

const fetchDashboardData = async () => {
  try {
    const { data } = await axios.get(
      "/api/dashboard/stats",
      {
        withCredentials: true,
      }
    );

    if (data.success) {
      setStats(data);
      setTopSellingDishes(data.topSellingDishes);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (admin) {
    fetchDashboardData();
  }
}, [admin]);


return(


    <div className="p-6">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#e2b11f] to-[#e7c463] rounded-2xl p-6  pl-15 text-white text-xl shadow-lg mb-8 flex items-center justify-between">

        {/* Left Side Text */}
        <div>
          <h1 className="text-4xl font-bold">
            Welcome Back Admin 👋
          </h1>

          <p className="mt-2 text-orange-100">
            Manage your restaurant efficiently
          </p>
          <p className="text-xl font-semibold mt-3">
              Revenue: ₹{stats.totalRevenue}
          </p>
        </div>


        {/* Right Side Admin Image */}
        <img
          src="https://i.pinimg.com/736x/a8/a1/d0/a8a1d01e1b054fbfa152bc6aa183cc41.jpg"
          alt="Restaurant"
          className="w-75 h-45  border-4 rounded-2xl border-white"
        />
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total Categories */}
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
  <div className="bg-blue-100 p-4 rounded-xl">
    <FolderTree size={32} className="text-blue-600" />
  </div>

  <div>
    <p className="text-gray-500">Total Categories</p>
    <h2 className="text-4xl font-bold">{stats.totalCategories}</h2>
  </div>
</div>

        {/* Total Menus */}
        <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center">
          <div className="bg-green-100 p-4 rounded-xl">
<UtensilsCrossed size={32} className="text-green-600" />        </div>

          <div>
            <p className="text-gray-500">Total Menus</p>
            <h2 className="text-4xl font-bold">
              {stats.totalMenus}
            </h2>
          </div>
          </div>

        {/* Total Orders */}
        <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center">
          <div className="bg-orange-100 p-4 rounded-xl">
  <ShoppingBag size={32} className="text-orange-600" />
        </div>
          <div>
            
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-4xl font-bold">
              {stats.totalOrders}
            </h2>
          </div>
        </div>
          


        {/* Total Bookings */}
        <div className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center">
          <div className="bg-purple-100 p-4 rounded-xl">
  <CalendarDays size={32} className="text-purple-600" />
</div>
          <div>
            <p className="text-gray-500">Total Bookings</p>
            <h2 className="text-4xl font-bold">
              {stats.totalBookings}
            </h2>
          </div>

        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">



        {/* Today's Overview */}
        <div className="bg-white rounded-xl shadow-md p-6">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-bold">
      Today's Overview
    </h2>

    
  </div>

  <div className="flex justify-between items-center text-center">

  {/* Today's Orders */}
  <div className="flex-1">
    <ClipboardCheck
      size={38}
      className="mx-auto text-blue-500"
    />
    <p className="mt-2 text-gray-600">
      Today's Orders
    </p>
    <h3 className="text-3xl font-bold">
      {stats.totalOrders}
    </h3>
  </div>

  <div className="h-24 border-r border-gray-200"></div>

  {/* Pending Orders */}
  <div className="flex-1">
    <Clock3
      size={38}
      className="mx-auto text-orange-500"
    />
    <p className="mt-2 text-gray-600">
      Pending Orders
    </p>
    <h3 className="text-3xl font-bold">
      {stats.pendingOrders}
    </h3>
  </div>

  <div className="h-24 border-r border-gray-200"></div>

  {/* Delivered Orders */}
  <div className="flex-1">
    <CheckCircle2
      size={38}
      className="mx-auto text-green-500"
    />
    <p className="mt-2 text-gray-600">
      Delivered Orders
    </p>
    <h3 className="text-3xl font-bold">
      {stats.deliveredOrders}
    </h3>
  </div>

  <div className="h-24 border-r border-gray-200"></div>

  {/* Revenue */}
  <div className="flex-1">
    <IndianRupee
      size={38}
      className="mx-auto text-purple-500"
    />
    <p className="mt-2 text-gray-600">
      Today's Revenue
    </p>
    <h3 className="text-3xl font-bold">
      ₹{stats.totalRevenue}
    </h3>
  </div>

</div>
</div>

        {/* Top Selling Dishes */}
        <div className="bg-white rounded-xl shadow-md p-6">
  <div className="flex justify-between items-center mb-5">
    <h2 className="text-xl font-bold">
      Top Selling Dishes
    </h2>

 
  </div>

  <div className="space-y-4">

     

  {topSellingDishes.map((item, index) => (
    <div
      key={item._id}
      className="flex justify-between items-center"
    >
      <div className="flex items-center gap-3">

        <img
          src={item.image}
          alt={item.name}
          className="w-10 h-10 rounded-full object-cover"
        />

        <span className="font-medium">
          {index + 1}. {item.name}
        </span>

      </div>

      <span className="text-gray-500">
        {item.totalOrders} Orders
      </span>
    </div>
  ))}

          </div>
       </div>
     </div>
       {/* Quick Actions */}
<div className="bg-white rounded-xl shadow-md p-6 mt-6">

  <h2 className="text-xl font-bold mb-5">
    Quick Actions
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

    <button
    
      onClick={() => navigate("/admin/add-category")}
      className="flex items-center justify-center gap-2 w-full h-16 rounded-xl text-white font-semibold
      bg-gradient-to-r from-blue-500 to-blue-600
      hover:scale-105 hover:shadow-lg transition-all duration-300"
    >
      <Plus size={20} />
       Add Category
    </button>

    <button
      onClick={() => navigate("/admin/add-menu")}
      className="flex items-center justify-center gap-2 w-full h-16 rounded-xl text-white font-semibold
      bg-gradient-to-r from-green-500 to-green-600
      hover:scale-105 hover:shadow-lg transition-all duration-300"
    >
      <Package size={20} />
       Add Menu Item
    </button>

    <button
      onClick={() => navigate("/admin/orders")}
      className="flex items-center justify-center gap-2 w-full h-16 rounded-xl text-white font-semibold
      bg-gradient-to-r from-purple-500 to-purple-600
      hover:scale-105 hover:shadow-lg transition-all duration-300"
    >
      <ShoppingCart size={20} />
       View Orders
    </button>

    <button
      onClick={() => navigate("/admin/bookings")}
      className="flex items-center justify-center gap-2 w-full h-16 rounded-xl text-white font-semibold
      bg-gradient-to-r from-orange-500 to-orange-600
      hover:scale-105 hover:shadow-lg transition-all duration-300"
    >
      <CalendarDays size={20} />
       View Bookings
    </button>

    

  </div>

</div>

  </div>


  );
};

export default Dashboard;