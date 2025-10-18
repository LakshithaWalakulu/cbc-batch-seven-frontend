import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
export default function Header() {
	return (
		<header className="w-full bg-accent  h-[100px] text-white px-[40px]">
			<div className="w-full h-full  flex relative items-center">
				<img src="/logo.png" className="h-full absolute w-[170px] left-0  object-cover" />
                <div className="h-full  flex justify-center items-center w-full text-lg gap-[30px]">
					
					<Link to="/" className=" hover:text-secondary" >Home</Link>
                   <Link to="/products" className=" hover:text-secondary" >Products</Link>
                    <Link to="/about" className=" hover:text-secondary">About</Link>
                    <Link to="/contact" className=" hover:text-secondary">Contact</Link>
					<Link to ="/review" className=" hover:text-secondary">Review</Link>
                    
                </div>
				<Link to="/cart" className="h-full absolute right-0  flex justify-center items-center text-2xl hover:text-secondary">
				<BsCart3/>
                
				</Link>
			</div>
		</header>
	);
}
