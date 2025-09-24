import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const navigate = useNavigate();

  async function login() {
		try {
			const response = await axios.post(
				import.meta.env.VITE_API_URL + "/api/users/login",
				{ 
                 email , password 
                }
                
			);

            localStorage.setItem("token", response.data.token); //store user's token in local storage
            //const token=localStorage.getItem("token");
            toast.success("Login successful!");
			const user = response.data.user;
			if (user.role == "admin") { 
				navigate("/admin");
			} else {
				navigate("/");
			}
		} catch (e) {
			console.error("Login failed:", e);
            //alert("Login failed. Please check your credentials.");
            toast.error("Login failed. Please check your credentials.");
           
		}
	}

    return (
        <div className="w-full h-screen flex bg-[url('/bg.jpg')] bg-cover bg-center relative">
            
            {/* Fixed Logo Top-Left */}
            <div className="absolute top-6 left-6 z-20">
                <img src="/logo.png" alt="CBC Logo" className="w-20 drop-shadow-lg" />
            </div>

            {/* Left Side with Gradient Overlay */}
            <div className="hidden lg:flex w-1/2 h-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[--color-accent]/90 via-[--color-secondary]/80 to-[--color-secondary]/95 opacity-90"></div>
                <div className="relative z-10 flex flex-col justify-center items-center text-center px-10">
                    <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
                        Crystal Beauty Clear
                    </h1>
                    <p className="mt-4 text-lg text-white/80 max-w-md">
                        Discover elegance with <span className="text-[--color-primary] font-semibold">CBC Global</span>.  
                        Pure beauty, crystal clear confidence.
                    </p>
                </div>
            </div>

            {/* Right Side Login Form */}
            <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
                <div className="w-[500px] max-w-full p-10 backdrop-blur-2xl bg-white/10 rounded-3xl shadow-2xl flex flex-col justify-center items-center gap-6 border border-white/20 animate-fadeIn">
                    
                    {/* Title */}
                    <h2 className="text-3xl font-bold text-[--color-secondary] text-center">
                        Login to Your Beauty Account ✨
                    </h2>
                    <p className="text-sm text-gray-200 text-center">
                        Access your orders, track deliveries, and enjoy exclusive beauty offers.
                    </p>

                    {/* Inputs */}
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-white/90 focus:bg-white outline-none border border-gray-300 focus:border-[--color-accent] focus:ring-2 focus:ring-[--color-accent]/50 transition-all placeholder-gray-500"
                        placeholder="Enter your email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-white/90 focus:bg-white outline-none border border-gray-300 focus:border-[--color-accent] focus:ring-2 focus:ring-[--color-accent]/50 transition-all placeholder-gray-500"
                        placeholder="Enter your password"
                    />

                    {/* Button */}
                    <button
                        onClick={login}
                        className="w-full h-12 bg-[--color-accent] text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] hover:bg-[#e76f1f] active:scale-[0.98] transition-transform duration-200"
                    >
                        Login & Shop Now
                    </button>

                    {/* Extra Links */}
                    <div className="flex justify-between w-full text-sm text-gray-300 mt-2">
                        <a href="#" className="hover:text-[--color-accent] transition-colors">Forgot password?</a>
                        <a href="#" className="hover:text-[--color-accent] transition-colors">New here? Create an account</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
