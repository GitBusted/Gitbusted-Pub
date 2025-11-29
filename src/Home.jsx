import React from "react";
import { Link } from "react-router";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white relative flex flex-col main-font">
      {/* NAVBAR */}
      <nav className="w-full py-8 flex justify-center items-center relative">
        {/* GitHub Icon (top-right) */}
        {/* <img
          src="/github-brands-solid-full.webp" // from /public
          alt="github"
          className="w-12 absolute right-10  opacity-80 hover:opacity-100 duration-200 cursor-pointer rounded-xl"
        /> */}
        {/* Centered Nav Items */}
        <ul className="flex gap-10  items-center text-xl font-semibold">
          <Link to="/">
            {" "}
            <li className="cursor-pointer hover:opacity-80 duration-200">
              Home
            </li>
          </Link>
          <Link to="/CheckMyCode">
            <li className="cursor-pointer hover:opacity-80 duration-200">
              Check My Code
            </li>
          </Link>

          <Link to="/About">
            <li className="cursor-pointer hover:opacity-80 duration-200">
              About
            </li>
          </Link>
          <Link to="https://github.com">
            <li>
              <img
                src="/github-brands-solid-full.webp" // from /public
                alt="github"
                className="w-12 opacity-80 hover:opacity-100 duration-200 cursor-pointer rounded-xl"
              />
            </li>
          </Link>
        </ul>
      </nav>

      {/* HERO CONTENT */}
      <div className="flex flex-col justify-center items-center flex-1 px-10 mb-20  text-center">
        <h1 className="text-8xl lg:text-[150px] font-bold tracking-tight leading-none font-main">
          Git-Busted
        </h1>

        <h2 className="text-3xl sm:text-[40px] font-semibold mt-6">
          Git Hub Pilgarism Check
        </h2>

        <p className="text-lg text-gray-300 mt-2 leading-relaxed">
          see how any piece of code matches a corresponding <br />
          git-hub repository
        </p>

        <button
          className="mt-8 px-8 py-3  bg-gray-200 text-black 
        text-xl font-bold rounded-full shadow-md 
        hover:bg-white transition cursor-pointer w-60"
        >
          <Link to="/CheckMyCode">
            <div>Check My Code</div>
          </Link>
        </button>
      </div>
    </div>
  );
}
