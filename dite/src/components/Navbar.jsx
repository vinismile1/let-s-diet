import React from "react";
import { Link } from "react-router-dom";
import { Salad } from "lucide-react";

const Navbar = () => {
    const menu = [
        {label :"Home", to:"/"},        
        {label :"About", to:"/about"},
        {label :"Contact", to:"/contact"},
        {label :"Login", to:"/login"}
    ]
  return (
    <nav className="bg-white shadow-md  sticky top-0 z-50">  
    <div className="mx-auto p-6 flex justify-between items-center" >

        <Link to ="/"
        className="text-2xl font-semibold flex items-center gap-2">
            <Salad size={32} />
            <span className="text-blue-600">Get
                 <span className="text-green-600">Healthy

                 </span>
            </span>
           
        </Link>

        <div className="flex gap-6">
           {
            menu.map((item)=>(
                <Link
                key={item.label}
                to={item.to}>
                    {item.label}
                </Link>
            ))
           }
         </div>
         
    </div>          
    {/* <h1 className="navbar-title">Dite</h1> */}
</nav>
);
}

export default Navbar;
