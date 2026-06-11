import { createContext, useState , useEffect} from "react";
import {useNavigate} from "react-router-dom";
export const AppContext = createContext();

import axios from "axios";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;
import {toast} from "react-hot-toast";

const AppContextProvider=({children})=>{
    const navigate=useNavigate();
    const[loading, setLoading] = useState(false);
    const[user, setUser] = useState(null);
    const[admin, setAdmin] = useState(null);
    const[categories, setCategories] = useState([]);
    const[menus, setMenus] = useState([]);

    const[cart,setCart]= useState([]);
    const [totalPrice,setTotalPrice]=useState(0);
    

    const fetchCartData=async()=>{
        try {
            const{data}=await axios.get("/api/cart/get");
            if(data.success){
                setCart(data.cart);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        if(cart?.items){
            const total = cart.items.reduce(
                (sum,item)=>sum + item.menuItem.price * item.quantity,
                0
            );
    
        setTotalPrice(total);
        }
    },  [cart]);


    //showing total cart
    const cartCount=cart?.items?.reduce(
        (acc,item)=>acc+item.quantity,
        0 || 0 
    );

    //Add to cart function
    const addToCart=async(menuId)=>{
        try {
            const {data}=await axios.post("/api/cart/add",{
                menuId,
                quantity:1,
            });
            if(data.success){
                toast.success(data.message);
                fetchCartData();
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Add to cart error:",error);
            toast.error("Somthing went wrong!");
        }
    }

 


    //this if for image that visible on page
    const fetchCategories=async()=>{
        try {
            const {data}=await axios.get("/api/category/all");
            if(data.success){
                setCategories(data.categories);
            }else{
                console.log("Failed to fech catehories");
            }
        } catch (error) {
            console.log("Error feching categories:",error);
        }
    };
    const fetchMenus=async()=>{
        try {
            const {data}=await axios.get("/api/menu/all");
            console.log("data",data);
            if(data.success){
                setMenus(data.menuItems);
            }else{
                console.log("Failed to fech catehories");
            }
        } catch (error) {
            console.log("Error feching categories:",error);
        }
    };

    const isAuth=async()=>{
        try {
            const {data}=await axios.get("/api/auth/is-auth");
            if(data.success) {
                setUser(data.user);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(()=>{
        isAuth();
        fetchCategories();
        fetchMenus();
        fetchCartData();

    },[]);
    const value={navigate,
                 loading,  
                 setLoading, 
                 user, 
                 setUser, 
                 axios, 
                 admin, 
                 setAdmin, 
                 categories,
                 fetchCategories,
                 menus,
                 fetchMenus,
                 addToCart,
                 fetchCartData,
                 cartCount,
                 cart,
                 totalPrice,
                };
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;