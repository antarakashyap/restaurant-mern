import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import {Calendar, LogOut, Package, ShoppingCart, UserCircle, Menu,X} from "lucide-react";
import toast from "react-hot-toast";


const Navbar = () => {
  const { navigate, user, setUser , axios , cartCount }=useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen]=useState(false);
  const [isProfileOpen, setIsProfileOpen]=useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);


  const logout=async()=>{
        try {
            const {data}=await axios.post("/api/auth/logout");
            if(data.success) {
                setUser(null);
                toast.success(data.message);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };


  return (
    <nav className="bg-cyan-50 shadow-md sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* left - LOGO (destot)*/}
          <div className="flex items-center">
            <Link to="/" className="text=2xl font-bold text-blue-600">
            <img src="./logo.png" alt="" className="w=32" />
            </Link>
          </div>


          {/* center - Menu Items(destop) */}
          <div className="hidden md:flex items-center space-x-8">
            
            <Link 
            to={"/"} 
            className="text-gray-700 hover:text-blue-600 transition-colors font-mendium"
            >
              Home
            </Link>

            <Link 
            to={"/menu"} 
            className="text-gray-700 hover:text-blue-600 transition-colors font-mendium"
            >
              Menus
            </Link>

             <Link 
            to={"/book-table"} 
            className="text-gray-700 hover:text-blue-600 transition-colors font-mendium"
            >
              Book Table
            </Link>

            <Link 
            to={"/contact"} 
            className="text-gray-700 hover:text-blue-600 transition-colors font-mendium"
            >
              Contact
            </Link>

          </div>


          {/* right - Cart & login/Profile */}
          <div className="flex items-center gap-3">

  <button
    onClick={() => navigate("/cart")}
    className="relative p-2 hover:bg-gray-100 rounded-lg"
  >
    <ShoppingCart size={22} className="text-gray-700" />

    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {cartCount > 0 ? cartCount : 0}
    </span>
  </button>
{/* moblibe hamburger icon */}
  <button
    className="md:hidden p-2"
    onClick={() => setMobileMenu(true)}
  >
    <Menu size={28} />
  </button>

            {/* login/profile - desktop */}
            <div className="hidden md:block"> {/* only visible on big screen */}
              {
                user?(
                  <div className="relative" >
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onMouseEnter={()=>setIsProfileOpen(true)}
                    onMouseLeave={()=>setIsProfileOpen(false)}
                    >
                      <UserCircle size={30} className="text-gray-700"/>
                    </button>

                    {
                      isProfileOpen&&(
                        <div
                          onMouseEnter={()=>setIsProfileOpen(true)}
                          onMouseLeave={()=>setIsProfileOpen(false)}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100"
                          >

                            <Link to={"/my-bookings"}
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <Calendar size={18} className="mr-3"/>
                              My Bookings
                            </Link>

                            <Link to={"/my-orders"}
                            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <Package size={18} className="mr-3"/>
                              My Orders
                            </Link>

                            <button
                            onClick={logout}
                            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut size={18} className="mr-3"/>
                              Logout
                            </button>
                        </div>
                      )
                    }
                  </div>
                ):(
                  <button 
                  onClick={()=> navigate("/login")}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium cursor-pointer"
                  >Login
                  </button>
                )
              }

            </div>
          </div>
        
        
        </div>

        {/* thif is for mobile */}


        {/* Overlay */}
{mobileMenu && (
  <div
    className="fixed inset-0 bg-black/50 z-40"
    onClick={() => setMobileMenu(false)}
  />
)}

{/* Sidebar */}
<div
  className={`fixed top-0 left-0 h-full w-74 bg-white z-50 shadow-lg
  transform transition-transform duration-300
  ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}
>

<div className="flex justify-between items-center p-5 border-b bg-orange-50">
      <h2 className="font-bold text-xl text-orange-600">
  Menu
</h2>

    <button onClick={() => setMobileMenu(false)}>
      <X />
    </button>
  </div>

  <div className="flex flex-col p-4 gap-4 items-center">

    <button
  className="w-full text-center py-3 px-4 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition text-2xl font-semibold"
  onClick={() => {
    navigate("/");
    setMobileMenu(false);
  }}
>
  Home
</button>

    <button
      className="w-full text-center py-3 px-4 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition text-2xl font-semibold"
  onClick={() => {
    navigate("/menu");
    setMobileMenu(false);
  }}
>
  Menus
</button>

<button
  className="w-full text-center py-3 px-4 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition text-2xl font-semibold"
  onClick={() => {
    navigate("/book-table");
    setMobileMenu(false);
  }}
>
  Book Table
</button>

<button
  className="w-full text-center py-3 px-4 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition text-2xl font-semibold"
  onClick={() => {
    navigate("/contact");
    setMobileMenu(false);
  }}
>
  Contact
</button>
{user&&(
  <>
<button
  className="w-full text-center py-3 px-4 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition text-2xl font-semibold"
  onClick={() => {
    navigate("/my-orders");
    setMobileMenu(false);
  }}
>
  My Orders
</button>

<button
  className="w-full text-center py-3 px-4 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition text-2xl font-semibold"
  onClick={() => {
    navigate("/my-bookings");
    setMobileMenu(false);
  }}
>
  My Bookings
</button>
</>
)}
<div className="absolute bottom-6 left-0 w-full px-4">

  <div className="absolute bottom-6 left-0 w-full px-4">

  {user ? (

    <button
      onClick={() => {
        logout();
        setMobileMenu(false);
      }}
      className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition"
    >
      Logout
    </button>

  ) : (

    <>
      <button
        className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold mb-3 hover:bg-red-600 transition"
        onClick={() => {
          navigate("/login");
          setMobileMenu(false);
        }}
      >
        Login
      </button>

      <button
        className="w-full border-2 border-red-500 text-red-500 py-3 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition"
        onClick={() => {
          navigate("/signup");
          setMobileMenu(false);
        }}
      >
        Sign Up
      </button>
    </>

  )}

</div>

</div>

  </div>

</div>

        
      </div>

    </nav>
  )
}

export default Navbar;