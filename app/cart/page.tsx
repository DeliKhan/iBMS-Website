import CartItems from "./cartItems";
import Navbar from "../_components/Navbar";
export default function Page(){
    return (
        <>
            <Navbar/>
            <div className=" flex flex-col bg-black px-5 pt-8 pb-10" style={{
                backgroundImage: "url('/elipses.png')", 
            }}>
                <h1 className="text-6xl text-white pb-12">Cart</h1>
                <CartItems/>
            </div>
            
        </>
    )
}
