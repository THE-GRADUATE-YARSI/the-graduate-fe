import React, { useEffect, useState } from "react";
import "../assets/css/style.css";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";

function Navbar() {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.getElementById("navbar");
    if (scrollTop > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  return (
    <nav
      className="bg-transparent fixed w-full z-20 top-0 start-0 p-5"
      id="navbar"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse mr-auto"
        >
          <img
            src="https://students-apps.yarsi.ac.id/students02/graduate/public//graduate.png"
            className="h-10"
          />
          <span className="self-center text-2xl text-xl font-semibold whitespace-nowrap tracking-wide lg:text-3xl text-primary">
            The Graduate
          </span>
        </a>
        <div className="flex md:order-2">
          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded={!collapsed}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            collapsed ? "hidden" : ""
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:mt-0 bg-slate-300 lg:bg-transparent">
            <li>
              <a
                href="/"
                className="block py-2 nav-item px-3 text-primary active:text-blue2 hover:text-blue2 font-semibold mr-5"
                aria-current="page"
                current-page={location.pathname === "/" ? "true" : "false"}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/persyaratan"
                className="block py-2 nav-item px-3 text-primary active:text-blue2 hover:text-blue2 font-semibold mr-5"
                current-page={
                  location.pathname === "/persyaratan" ? "true" : "false"
                }
              >
                Persyaratan
              </a>
            </li>
            <button
              type="button"
              className="text-white bg-primary hover:bg-blue-800 font-medium rounded text-sm px-5 mx-4 lg:mx-0 py-2 text-center"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Login
            </button>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
