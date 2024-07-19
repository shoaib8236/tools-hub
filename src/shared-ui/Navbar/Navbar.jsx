import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
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
        className="p-2 rounded-full bg-black text-primary focus:outline-none"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
};

export default Navbar;
