import axios from "axios";
import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "../../components/loader";

// ... (ProductDeleteConfirm component remains the same)
function ProductDeleteConfirm(props){	
    const productID = props.productID;
    const close = props.close;
    const refresh = props.refresh
    function deleteProduct(){
        const token = localStorage.getItem("token");
        axios
            .delete(import.meta.env.VITE_API_URL + "/api/products/" + productID,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data);
                close();
                toast.success("Product deleted successfully");
                refresh();
            }).catch(() => {
                toast.error("Failed to delete product");
            })
    }

    return (<div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
            <div className="w-[500px] h-[200px] bg-primary relative flex flex-col justify-center items-center gap-[40px]">
                <button onClick={close} className="absolute right-[-42px] top-[-42px] w-[40px] h-[40px] bg-red-600 rounded-full text-white flex justify-center items-center font-bold border border-red-600 hover:bg-white hover:text-red-600">
                    X
                </button>
                <p className="text-xl font-semibold">Are you sure you want to delete the product with product ID : {productID}?</p>
                <div className="flex gap-[40px]">
                    <button onClick={close} className="w-[100px] bg-blue-600 p-[5px] text-white hover:bg-accent">
                        Cancel
                    </button>
                    <button onClick={deleteProduct} className="w-[100px] bg-red-600 p-[5px] text-white hover:bg-accent">
                        Yes
                    </button>
                </div>

            </div>
    </div>)
}


export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  // FIX 1: Define isLoading state and initialize to true
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false); // Set to false after data is fetched
        })
        .catch((error) => {
          console.error("Failed to fetch products:", error);
          toast.error("Could not load products.");
          setIsLoading(false); // Also set to false on error
        });
    }
  }, [isLoading]);

  // Show loader while fetching data
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen p-8 bg-primary text-secondary font-poppins">
      {isDeleteConfirmVisible && (
        <ProductDeleteConfirm
          refresh={() => setIsLoading(true)}
          productID={productToDelete}
          close={() => setIsDeleteConfirmVisible(false)}
        />
      )}

      {/* ... (rest of the JSX) */}
      <Link
        to="/admin/add-product"
        className="fixed right-[40px] bottom-[40px] hover:text-accent"
      >
        <CiCirclePlus className="text-3xl" />
      </Link>

      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-accent text-white px-8 py-5 text-xl font-semibold tracking-wide">
          Product Management
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-base">
            <thead>
              <tr className="bg-secondary text-white uppercase tracking-wide text-sm">
                <th className="py-4 px-6 text-left">Image</th>
                <th className="py-4 px-6 text-left">Product ID</th>
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">Price</th>
                <th className="py-4 px-6 text-left">Labelled Price</th>
                <th className="py-4 px-6 text-left">Stock</th>
                <th className="py-4 px-6 text-left">Category</th>
                <th className="py-4 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr
                  key={item.productID}
                  className="border-b hover:bg-primary/70 transition-colors"
                >
                  <td className="py-4 px-6">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg border border-secondary/20 object-cover"
                    />
                  </td>
                  <td className="py-4 px-6 font-medium text-sm">{item.productID}</td>
                  <td className="py-4 px-6 text-sm">{item.name}</td>
                  <td className="py-4 px-6 text-green-600 font-semibold text-sm">
                    LKR {item.price}
                  </td>
                  <td className="py-4 px-6 line-through text-gray-400 text-sm">
                    LKR {item.labelPrice}
                  </td>
                  <td className="py-4 px-6 text-gray-400 text-sm">{item.stock}</td>
                  <td className="py-4 px-6 text-sm">{item.category}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-3 justify-center">
                      <button
                        className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition"
                        // FIX 2: Set the product to delete before showing the modal
                        onClick={() => {
                          setProductToDelete(item.productID);
                          setIsDeleteConfirmVisible(true);
                        }}
                      >
                        <IoTrashOutline className="text-red-500 text-lg" />
                      </button>
                      <button
                        className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition"
                        onClick={() =>
                          navigate(`/admin/update-product/${item.productID}`, {
                            state: item,
                          })
                        }
                      >
                        <FaRegEdit className="text-accent text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {products.length === 0 && !isLoading && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-8 text-gray-500 italic text-base"
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