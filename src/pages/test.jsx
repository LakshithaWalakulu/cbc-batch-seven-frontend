import { useState } from "react"; // hooks are special functions that react provides to use state and other react features in functional components

export default function TestPage() {
	const [count, setCount] = useState(150);    // hooks should be declared on top of the function and that hooks execute in the order they are written(cannot be inside any conditionals or loops)
    const [status, setStatus] = useState("online"); // usestate hook returns an array with 2 values, 1st is the current state value and 2nd is a function to update that state value
    // there two are state variable and for every state variable should have useState hook


	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="w-[500px] h-[500px] bg-amber-100 text-white flex justify-center items-center flex-col gap-[25px]">
				<div className="flex justify-center items-center gap-[20px]">
					<button
						onClick={() => {
							console.log("Decreasing....");
							setCount(count -1);
						}}
						className="w-[100px] bg-accent h-[40px] rounded-lg"
					>
						-
					</button>

					<span className="text-accent text-5xl">{count}</span>

					<button
						onClick={() => {
							console.log("Increasing....");
							setCount(count + 1);
						}}
						className="w-[100px] bg-accent h-[40px] rounded-lg"
					>
						+
					</button>
				</div>
                <div className="flex flex-col justify-center items-center gap-[20px]">
                        <span className="text-accent text-5xl">{status}</span>
                        <div className="flex flex-row gap-[20px]">

                            <button onClick={() => setStatus("online")} 
                            className="w-[100px] bg-accent h-[40px] rounded-lg">
                                online
                            </button>

                            <button onClick={() => setStatus("offline")} 
							className="w-[100px] bg-accent h-[40px] rounded-lg">
                                offline
                            </button>

                            <button onClick={() => setStatus("deactivated")} 
							className="w-[100px] bg-accent h-[40px] rounded-lg">
                                deactivated
                            </button>

                        </div>
                </div>
			</div>
		</div>
	);
}
