import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateProductPage() {
  const location = useLocation();

  const [productID, setProductID] = useState(location.state.productID);
  const [name, setName] = useState(location.state.name);
  // FIX 1: Use .join() to convert the array to a string
  const [altNames, setAltNames] = useState(location.state.altNames.join(", "));
  const [description, setDescription] = useState(location.state.description);
  const [image, setImages] = useState([]);
  const [price, setPrice] = useState(location.state.price);
  const [labelPrice, setLabelPrice] = useState(location.state.labelPrice);
  const [category, setCategory] = useState(location.state.category);
  const [stock, setStock] = useState(location.state.stock);

  const navigate = useNavigate();

  async function updateProduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in.");
      navigate("/login");
      return;
    }

    try {
      const promises = image.map((file) => mediaUpload(file));
      let urls = await Promise.all(promises);

      if (urls.length === 0) {
        urls = location.state.image;
      }

      const alternativeNames = altNames.split(',').map(name => name.trim());
      const product = {
        productID,
        name,
        altNames: alternativeNames,
        description,
        // FIX 2: Use the correct variable 'urls'
        image: urls,
        price,
        labelPrice,
        category,
        stock,
      };

      // FIX 3: Add a slash before the productID
      await axios.put(import.meta.env.VITE_API_URL + "/api/products/" + productID, product, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      toast.success("Product updated successfully!");
      navigate("/admin/products");

    } catch (error) {
      console.error("Failed to update product:", error);
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  }

  // ... JSX remains the same
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-primary to-white">
      <div className="w-[600px] min-h-[600px] bg-white/80 backdrop-blur-md shadow-xl rounded-xl border border-accent/30 p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-secondary tracking-wide text-center mb-1">
         Update Product Details
        </h2>

        <input
           disabled    
          value={productID}
          onChange={(e) => setProductID(e.target.value)}
          placeholder="Product ID"
          className="border border-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
        />

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border border-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
        />

        <input
          value={altNames}
          onChange={(e) => setAltNames(e.target.value)}
          placeholder="Alternative Names (comma-separated)"
          className="border border-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={3}
          className="border border-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none transition"
        />

        <input
          type="file"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}
          className="w-full border border-gray-200 rounded-md px-3 py-2 file:mr-3 file:py-1 file:px-4 file:rounded-md file:border-0 file:bg-accent file:text-white file:text-sm hover:file:bg-accent/90 transition"
        />

        <div className="flex gap-3 w-full">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Price"
            className="flex-1 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
          />

          <input
            type="number"
            value={labelPrice}
            onChange={(e) => setLabelPrice(Number(e.target.value))}
            placeholder="Label Price"
            className="flex-1 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
          />

            <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            placeholder="stock"
            className="flex-1 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
        >
          <option value="cream">Cream</option>
          <option value="lotion">Lotion</option>
          <option value="serum">Serum</option>
        </select>

        <div className="absolute ">
          <div className=" fixed left-[10px] bottom-[10px] rounded-2xl ">
            <button
              onClick={updateProduct}
              type="button"
              className="mt-3 w-[150px] bg-secondary text-white font-medium py-2 rounded-md shadow-md hover:border-accent  hover:border-[2px] transition"
            >
              Submit
            </button>
          </div>

          <div className="fixed right-[10px] bottom-[10px] rounded-2xl ">
            <button
              onClick={() => {
                navigate("/admin/products");
              }}
              type="button"
              className="mt-3 w-[150px] bg-secondary text-white font-medium py-2 rounded-md shadow-md hover:border-accent hover:border-[2px] transition align-bottom-right"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}