import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="bg-primary text-black p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Navbar</div>
      <ul className="flex space-x-4">
        <li className="flex space-x-4 font-semibold [&>.active]:opacity-50">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/task-manager">Tasks</NavLink>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
      <button
        onClick={toggleDarkMode}
        className="h-[50px] w-[50px] relative p-2 rounded-full bg-black text-primary focus:outline-none"
      >
        {/* {darkMode ? ( */}
        <MdLightMode
          className={`absolute top-1/2 -translate-x-[50%] -translate-y-[50%] text-2xl duration-300 left-1/2 ${
            !darkMode ? "opacity-0 scale-0" : "opacity-1 scale-1"
          }`}
        />
        {/* ) : ( */}
        <MdDarkMode
          className={`absolute top-1/2 -translate-x-[50%] -translate-y-[50%] text-2xl duration-300 left-1/2 ${
            darkMode ? "opacity-0 scale-0" : "opacity-1 scale-1"
          }`}
        />
        {/* )} */}
      </button>
    </nav>
  );
};

export default Navbar;
