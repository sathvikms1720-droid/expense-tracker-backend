import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react"

import { motion } from "framer-motion"

function Navbar() {

  const username = localStorage.getItem("username");
  const profileImage = localStorage.getItem("profileImage");
  const email = localStorage.getItem("email");

const [showProfilePopup, setShowProfilePopup] = useState(false);

const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8"
    >

      {/* LEFT SECTION */}

        <div>

        <h2 className="text-[#111827] text-3xl font-bold tracking-tight">
        Welcome Back 👋
        </h2>

        <p className="text-gray-500 mt-2 text-sm lg:text-base">
          Here's what’s happening with your finances today.
        </p>

      </div>

      {/* RIGHT SECTION */}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

        {/* SEARCH BAR */}

      <div
  
  className="relative flex items-center gap-3 bg-white border border-purple-100 shadow-sm px-4 py-2 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300"
>
          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            type="text"
            placeholder="Search transactions..."
            className="bg-transparent outline-none text-sm text-[#111827] placeholder:text-gray-400 w-full"
          />

        </div>

        {/* NOTIFICATION */}

        <div className="w-12 h-12 rounded-2xl bg-white border border-purple-100 shadow-sm flex items-center justify-center cursor-pointer hover:bg-purple-50 transition-all duration-300">

          <Bell
            size={20}
            className="text-purple-600"
          />

        </div>

        {/* PROFILE */}

     <div
  onClick={() => setShowProfilePopup(!showProfilePopup)}
  className="relative z-[9999] flex items-center gap-3 bg-white border border-purple-100 shadow-sm px-4 py-2 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300"
>
          {profileImage ? (

  <img
    src={profileImage}
    alt="Profile"
    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
  />

) : (

  <div className="
    w-10 h-10 rounded-full
    bg-purple-100
    flex items-center justify-center
    text-purple-600 font-black text-[16px]
  ">
    {username?.charAt(0).toUpperCase()}
  </div>

)}

          <div className="hidden sm:block">

  <h4 className="text-sm font-semibold text-[#111827]">
  {username || "User"}
</h4>
  <p className="text-xs text-gray-500">
    {username || "User"}
  </p>

</div>

          <ChevronDown
            size={18}
            className="text-gray-400"
          />
          {showProfilePopup && (

  <div className="
    absolute top-[75px] right-0
    origin-top-right
    w-[320px]
    bg-white/90 backdrop-blur-xl
    border border-white/40
    rounded-[28px]
    p-6
    shadow-2xl
    z-[9999]
  ">

    <div className="flex flex-col items-center text-center">

      {profileImage ? (

        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-purple-100 shadow-lg"
        />

      ) : (

        <div className="
          w-24 h-24 rounded-full
          bg-purple-100
          flex items-center justify-center
          text-purple-600 text-[36px] font-black
        ">
          {username?.charAt(0).toUpperCase()}
        </div>

      )}

      <h3 className="mt-4 text-[22px] font-black text-[#111827]">
        {username || "User"}
      </h3>

      <p className="text-slate-500 text-[14px] mt-1">
        {email || "No Email"}
      </p>

      <button
        onClick={() => navigate("/settings")}
        className="
          mt-6 w-full py-3 rounded-2xl
          bg-[#7C3AED]
          text-white font-semibold
          hover:bg-purple-700
          transition-all
        "
      >
        Update Profile
      </button>

    </div>

  </div>

)}

        </div>

      </div>

    </motion.div>
  )
}

export default Navbar