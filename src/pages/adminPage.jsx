import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi2";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddNewProduct from "./admin/adminAddNewproduct";
import UpdateProductPage from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrdersPage";




export default function AdminPage(){
    return(
        <div className="w-full h-full bg-primary flex p-2">
            <div className="w-[300px] h-full items-center flex flex-col gap-[20px] ">
                <div className ="w-[90%] h-[60px] bg-accent flex flex-row  items-center  rounded-2xl text-white mb-[20px] ">
                 <img src="/logo.png" alt="Crystal Beauty Clear" className="h-[70px]"/>
                 <span className="text-white  text-xl ml-10">
                    Admin Panel
                 </span>
                </div>
                <Link to ="/admin" className="w-[90%] flex  gap-2 items center  px-4">
                <FaChartLine className="text-xl"/>
                Dashboard
                </Link>
                
                 <Link to ="/admin/orders" className="w-[90%] flex  gap-2 items center  px-4">
                <MdOutlineShoppingCartCheckout className="text-2xl"/>
                  Orders
                </Link>
                
                 <Link to ="/admin/products" className="w-[90%] flex  gap-2 items center  px-4">
               <BsBox2Heart className="text-xl"/>
                Products
                </Link>
                   
                 <Link to ="/admin/users" className="w-[90%] flex  gap-2 items center  px-4">
                 <HiOutlineUsers className="text-xl"/>
                Users
                </Link>

            </div>
            <div className="w-[calc(100%-300px)] h-full border-[2px] border-accent rounded-[20px] overflow-hidden">
                <div className=" w-full max-w-full h-full max-h-full overflow-y-scroll">

                <Routes path="/">
                    <Route path="/" element={<h1>Dashboard</h1>}/>
                    <Route path="/products" element={<AdminProductPage/>}/>
                    <Route path="/orders" element={<AdminOrdersPage/>}/>
                    <Route path="/add-product" element={<AdminAddNewProduct/>}/>
                  <Route path="/update-product/:id" element={<UpdateProductPage/>}/>
                </Routes> 

                </div>
            </div>
        </div>
    )
    
}