import axios from "axios";
import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminProductPage() {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/api/products").then((res) => {
      console.log(res.data);
      setproducts(res.data);
    });
  }, []);

  return (
    <div className="w-full h-full p-10 bg- primary text-secondary font-poppins">
        <Link to="/admin/add-product"className="fixed right-[50px] bottom-[50px] hover:text-accent"> 
        <CiCirclePlus className = "text-4xl"/>

      </Link>
     
      <div className="max-w-8xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-accent text-white px-10 py-6 text-2xl font-semibold tracking-wide">
          Product Management
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-lg">
            <thead>
              <tr className="bg-secondary text-white uppercase tracking-wide">
                <th className="py-6 px-10 text-left">Image</th>
                <th className="py-6 px-10 text-left">Product ID</th>
                <th className="py-6 px-10 text-left">Name</th>
                <th className="py-6 px-10 text-left">Price</th>
                <th className="py-6 px-10 text-left">Labelled Price</th>
                <th className="py-6 px-10 text-left">Stock</th>
                <th className="py-6 px-10 text-left">Category</th>
                <th className="py-6 px-10 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr
                  key={item.productID}
                  className="border-b hover:bg-primary/70 transition-colors"
                >
                  <td className="py-6 px-10">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg border border-secondary/20 object-cover"
                    />
                  </td>
                  <td className="py-6 px-10 font-medium">{item.productID}</td>
                  <td className="py-6 px-10">{item.name}</td>
                  <td className="py-6 px-10 text-green-600 font-semibold">
                   LKR{item.price}
                  </td>
                  <td className="py-6 px-10 line-through text-gray-400">
                    LKR{item.labelPrice}
                  </td>
                  <td className="py-6 px-10  text-gray-400">
                    {item.stock}
                  </td>
                  <td className="py-6 px-10">{item.category}</td>
                  <td className="py-6 px-10">
                    <div className="flex gap-5 justify-center">
                      <button className="p-3 rounded-full bg-red-50 hover:bg-red-100 transition">
                        <IoTrashOutline className="text-red-500 text-xl" />
                      </button>
                      <button className="p-3 rounded-full bg-accent/10 hover:bg-accent/20 transition">
                        <FaRegEdit className="text-accent text-xl"
                        onClick={() => {
                          // FIX: Pass the product ID in the URL
                          navigate(`/admin/update-product/${item.productID}`,{
                            state: item
                          });
                        }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-10 text-gray-500 italic text-lg"
                  >
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}





