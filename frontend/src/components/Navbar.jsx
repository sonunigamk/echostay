import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { FaSearch, FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdWhatshot } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const Navbar = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const { userData, setUserData } = useContext(UserDataContext);
    const { serverUrl } = useContext(AuthDataContext);

    const handleNavigate = (path) => {
        navigate(path);
        setShowPopup(false);
    };

    const handleLogOut = async () => {
        try {
            await axios.post(`${serverUrl}/api/auth/logout`, null, {
                withCredentials: true,
            });
            setUserData(null);
        } catch (error) {
            console.error("Logout failed:", error.response?.data || error.message);
            alert("Logout failed. Please try again.");
        }
    };

    const PopupMenu = () => (
        <div className="w-[180px] bg-slate-50 absolute right-0 border border-slate-300 rounded-lg p-2 shadow-md z-50 md:top-[120%] top-full mt-2 md:mt-0">
            <ul className="flex flex-col text-gray-700">
                <li
                    onClick={() => {
                        if (!userData) {
                            handleNavigate("/login");
                        } else {
                   
                            //  use toast/popup here
                        }
                    }}
                    className={`hover:bg-slate-100 w-full p-1.5 rounded-md 
              ${userData ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    Login
                </li>
                <li
                    onClick={handleLogOut}
                    className="hover:bg-slate-100 w-full p-1.5 rounded-md cursor-pointer"
                >
                    Logout
                </li>
                <li className="border-b border-slate-300 w-full my-1"></li>
                <li
                    onClick={() => handleNavigate("/list-your-home")}
                    className="hover:bg-slate-100 w-full p-1.5 rounded-md cursor-pointer"
                >
                    List Your Home
                </li>
                <li
                    onClick={() => handleNavigate("/my-listings")}
                    className="hover:bg-slate-100 w-full p-1.5 rounded-md cursor-pointer"
                >
                    My Listing
                </li>
                <li
                    onClick={() => handleNavigate("/my-bookings")}
                    className="hover:bg-slate-100 w-full p-1.5 rounded-md cursor-pointer"
                >
                    Check Booking
                </li>
            </ul>
        </div>
    );

    return (
        <div className="w-screen px-4 sm:px-6 md:px-10 py-2">
            {/* ---------- Top Row ---------- */}
            <div className="flex items-center justify-between w-full">
                {/* Logo */}
                <img
                    onClick={() => navigate("/")}
                    src={logo}
                    alt="EchoStay logo"
                    className="h-10 sm:h-12 w-auto object-contain cursor-pointer"
                />

                {/* Search Bar (desktop) */}
                <div className="hidden md:block w-[35%] max-w-md relative">
                    <input
                        type="text"
                        placeholder="Any city | Any time"
                        className="border-2 border-slate-400 w-full py-1.5 px-5 rounded-full outline-none text-md shadow-sm focus:border-amber-500 transition"
                    />
                    <button
                        type="button"
                        className="absolute bg-red-600 rounded-full p-2 text-white right-2 top-1 hover:bg-red-700 transition-colors"
                    >
                        <FaSearch />
                    </button>
                </div>

                {/* --- Actions (shared for mobile & desktop) --- */}
                <div className="relative flex items-center gap-3 sm:gap-5">
                    <span
                        onClick={() => handleNavigate("/list-your-home")}
                        className="hidden md:inline cursor-pointer hover:bg-slate-100 p-2 px-4 rounded-full font-medium transition-colors"
                    >
                        List your home
                    </span>

                    <button
                        onClick={() => setShowPopup(!showPopup)}
                        className="border border-slate-700 rounded-full flex items-center justify-center gap-2 py-1 px-2 sm:px-3 hover:shadow-md transition"
                    >
                        <GiHamburgerMenu className="text-lg" />
                        {userData ? (
                            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-red-600 text-white text-sm font-semibold">
                                {userData.name?.charAt(0).toUpperCase()}
                            </span>
                        ) : (
                            <FaRegUserCircle className="text-lg" />
                        )}
                    </button>

                    {showPopup && <PopupMenu />}
                </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden w-[80%] relative mt-3 mx-auto">
                <input
                    type="text"
                    placeholder="Any city | Any time"
                    className="border-2 border-slate-400 w-full py-1.5 px-5 rounded-full outline-none text-md shadow-sm focus:border-amber-500 transition"
                />
                <button
                    type="button"
                    className="absolute bg-red-600 rounded-full p-2 text-white right-2 top-1 hover:bg-red-700 transition-colors"
                >
                    <FaSearch />
                </button>
            </div>

            {/* ---------- Category row ---------- */}
            <div className="w-full flex overflow-x-auto items-center justify-start md:justify-center gap-6 sm:gap-10 py-3 mt-2 border-t border-b border-slate-200 bg-white scrollbar-hide snap-x snap-mandatory md:snap-none">
                {[
                    "Trending",
                    "Beach",
                    "Cabins",
                    "City Views",
                    "Countryside",
                    "Historic",
                    "Luxury",
                ].map((label, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col items-center justify-center hover:border-b-2 border-amber-500 text-sm sm:text-md cursor-pointer transition-all pb-1 snap-center flex-shrink-0"
                    >
                        <MdWhatshot className="text-lg sm:text-xl" />
                        <h3 className="mt-1 whitespace-nowrap">{label}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Navbar;