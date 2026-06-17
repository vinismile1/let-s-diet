import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

const navigate =useNavigate();

  const bodyType = [
    {
      name: "Lean",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGpc-SKe50CZIBGHVMc-yEvRj3GFNpDmdBtZkSeyHejk_ZiCiEu_N1jSH-7Fm1ABuuAm8&usqp=CAU",
      desc: "Lean body type, for toned body",
    },
    {
      name: "Bulky",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGpc-SKe50CZIBGHVMc-yEvRj3GFNpDmdBtZkSeyHejk_ZiCiEu_N1jSH-7Fm1ABuuAm8&usqp=CAU",
      desc: "For muscle mass gain",
    },
    {
      name: "Fit",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGpc-SKe50CZIBGHVMc-yEvRj3GFNpDmdBtZkSeyHejk_ZiCiEu_N1jSH-7Fm1ABuuAm8&usqp=CAU",
      desc: "For healthy fit body",
    },
    {
      name: "Athletic",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGpc-SKe50CZIBGHVMc-yEvRj3GFNpDmdBtZkSeyHejk_ZiCiEu_N1jSH-7Fm1ABuuAm8&usqp=CAU",
      desc: "For ultra endurance",
    },
    {
      name: "Shreded",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGpc-SKe50CZIBGHVMc-yEvRj3GFNpDmdBtZkSeyHejk_ZiCiEu_N1jSH-7Fm1ABuuAm8&usqp=CAU",
      desc: "For muscular body agility",
    },
    {
      name: "Power",
      image:
        "https://encrypted- tbn0.gstatic.com/images?q=tbn:ANd9GcTGpc-SKe50CZIBGHVMc-yEvRj3GFNpDmdBtZkSeyHejk_ZiCiEu_N1jSH-7Fm1ABuuAm8&usqp=CAU",
      desc: "Powerlifting strength ",
    },
    {
      name: "FatLoss",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGpc-SKe50CZIBGHVMc-yEvRj3GFNpDmdBtZkSeyHejk_ZiCiEu_N1jSH-7Fm1ABuuAm8&usqp=CAU",
      desc: "Ultra Fatloss and fitness",
    },
  ];

  const handleSelect=(name)=>{
    console.log(name);
    
        navigate(`/target-setup?bodyType=${name}`)
  }

  return (
    <div className="bg-gray-200 min-h-screen p-6">
      <h1 className="text-3xl text-center font-bold text-yellow-500 mb-8">
        Choose your BodyType
      </h1>

      <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {bodyType.map((item)=>(
                <div key={item.name}
                onClick={()=>handleSelect(item.name)}
                className="bg-white p-6 rounded-xl text-center shadow-xl hover:scale-105 transition-all cursor-pointer">

                    <img src={item.image} alt={item.name}
                    className="h-40 w-40 rounded-full object-cover mx-auto mb-4" />
                        
                    <h2 className="text-gray-700 font-semibold text-xl">
                        {item.name}
                    </h2>

                    <p className="text-md mb-4 text-gray-600">{item.desc}</p>

                    <button 
                    className="bg-indigo-600 px-4 py-2 rounded-xl hover:bg-indigo-700 text-white"
                    >Select</button>

                </div>
            ))}
      </div>
    </div>
  );
};

export default Dashboard;