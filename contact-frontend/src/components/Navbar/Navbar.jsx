import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { BsPersonFillAdd } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ loggedInUser, onLogOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    onLogOut();
    // clear the access token from local storage
    localStorage.clear();
    toast.success("Logged out");
  };
  
  return (
    <nav className="text-black bg-indigo-500 sticky shadow-md top-0">
      <div className="container mx-auto px-4 py-4 md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-2xl">
            Welcome, {loggedInUser.username}
          </h2>
          <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
            <BiMenu className="text-2xl text-white" />
          </button>
        </div>
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center mt-4 md:mt-0  gap-6`}
        >
          <li>
            <NavLink
              to="/create-contact"
              className="flex flex-col text-white items-center hover:cursor-pointer hover:opacity-70"
            >
              <BsPersonFillAdd
                className="text-3xl text-white"
                title="view contact"
              />
              <p className="text-sm font-medium"> Add Contact </p>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/view-contacts"
              className="flex flex-col text-white items-center hover:cursor-pointer hover:opacity-70"
            >
              <TiContacts className="text-3xl text-white" />
              <p className="text-sm text-white font-medium"> Contact </p>
            </NavLink>
          </li>

          <li
            onClick={handleClick}
            className="flex flex-col text-white items-center hover:cursor-pointer hover:opacity-70"
          >
            <MdLogout className="text-3xl" />
            <p className="text-sm text-white font-medium">Logout</p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
