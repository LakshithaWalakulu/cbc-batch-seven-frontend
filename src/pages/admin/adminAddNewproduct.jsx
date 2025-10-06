import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminAddNewProduct() {
  const [productID, setProductID] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImages] = useState([]);
  const [price, setPrice] = useState();
  const [labelPrice, setLabelPrice] = useState();
  const [category, setCategory] = useState("cream");
  const [stock, setStock] = useState();

  const navigate = useNavigate();

  async function addProduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in.");
      navigate("/login");
      return;
    }

    // Use a single try...catch block for the entire process
    try {
      // 1. Upload images first
      const promises = image.map((file) => mediaUpload(file));
      const imageLinks = await Promise.all(promises);

      // 2. Prepare product data
      const alternativeNames = altNames.split(',').map(name => name.trim()); // Trim whitespace
      const product = {
        productID,
        name,
        altNames: alternativeNames,
        description,
        image: imageLinks,
        price,
        labelPrice,
        category,
        stock,
      };

      // 3. Send data to the backend and AWAIT the response
      await axios.post(import.meta.env.VITE_API_URL + "/api/products", product, {
        headers: {
          // 4. FIX: Added a space after "Bearer"
          Authorization: "Bearer " + token,
        },
      });

      // This code only runs if the axios call was successful
      toast.success("Product added successfully!");
      navigate("/admin/products");

    } catch (error) {
      // 5. Provide specific error feedback
      console.error("Failed to add product:", error);
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  }

  // ... JSX remains the same
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-primary to-white">
      <div className="w-[600px] min-h-[600px] bg-white/80 backdrop-blur-md shadow-xl rounded-xl border border-accent/30 p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-secondary tracking-wide text-center mb-1">
          Add New Product
        </h2>

        <input
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
          value={stock}
          type="number"
          onChange={(e) => setStock(e.target.value)}
          placeholder="stock"
          className="border border-gray-200 rounded-md px-3 py-2 w-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none transition"
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
              onClick={addProduct}
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
