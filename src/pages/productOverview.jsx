
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { addToCart } from "../utils/cart";
import CheckoutPage from "./checkOut";
import { Link } from "react-router-dom";

export default function ProductOverview() {
  const params = useParams();
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"
  const [product, setProduct] = useState(null);
 

  
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products/" + params.id)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("Failed to fetch product details");
        setStatus("error");
      });
  }, [params.id]);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary text-secondary py-12 px-6">
      {status === "loading" && (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      )}

      {status === "success" && product && (
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-10">
          {/* Left: Image Slider */}
          <div className="md:w-1/2 w-full flex justify-center items-center rounded-xl overflow-hidden shadow-lg bg-white p-4">
            <ImageSlider images={product.image} />
          </div>

          {/* Right: Product Info */}
          <div className="md:w-1/2 w-full flex flex-col gap-6">
            {/* Product ID */}
            <span className="text-sm text-secondary/70">{product.productID}</span>

            {/* Product Name & Alt Names */}
            <h1 className="text-3xl font-bold text-secondary">
              {product.name}
              {product.altNames &&
                product.altNames.map((name, index) => (
                  <span key={index} className="font-normal text-secondary/70">
                    {" | " + name}
                  </span>
                ))}
            </h1>

            {/* Description */}
            <p className="text-justify text-secondary/90 leading-relaxed">
              {product.description}
            </p>

            {/* Category */}
            <p className="text-secondary/80 font-medium">
              <span className="font-semibold text-secondary">Category: </span>
              {product.category}
            </p>

            {/* Price */}
            {product.labelPrice > product.price ? (
              <div className="flex items-center gap-4">
                <p className="text-lg text-secondary font-semibold line-through">
                  LKR {product.labelPrice.toFixed(2)}
                </p>
                <p className="text-2xl text-accent font-bold">
                  LKR {product.price.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-2xl text-accent font-bold">
                LKR {product.price.toFixed(2)}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button className="flex-1 py-3 bg-accent text-white font-semibold rounded-lg shadow hover:bg-accent/80 transition-colors duration-300"
			   onClick={()=>{
				addToCart(product,1)
				toast.success("Added to cart")
			   }}>
                Add to Cart
              </button>
               <Link to="/checkout" state={[{
								image : product.image[0],
								productID : product.productID,
								name : product.name,
								price : product.price,
								labelPrice : product.labelPrice,
								quantity : 1
							}]} className="w-[50%] flex justify-center items-center text-center h-full border border-accent text-accent font-semibold hover:bg-accent hover:text-white"
							>Buy Now</Link>

            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <h1 className="text-red-500 text-center mt-20">
          Failed to load product details
        </h1>
      )}
    </div>
  );
}
