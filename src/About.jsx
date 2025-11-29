import React from "react";
import { Link } from "react-router";
export default function About() {
  return (
    <>
      {" "}
      <div className="bg-black min-h-screen text-white relative flex flex-col main-font">
        {/* NAVBAR */}
        <nav className="w-full py-8 flex justify-center items-center relative">
          {/* GitHub Icon (top-right) */}
          <img
            src="/github-brands-solid-full.webp" // from /public
            alt="github"
            className="w-12 absolute right-10  opacity-80 hover:opacity-100 duration-200 cursor-pointer rounded-xl"
          />

          {/* Centered Nav Items */}
          <ul className="flex gap-10 text-xl font-semibold">
            <Link to="/">
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
          </ul>
        </nav>
        <div className="text-center font-bold text-5xl mb-5">Know Us !</div>
        <div className="about-all flex flex-row justify-center mt-5 items-center gap-5 mx-5 relative">
          <div className="about-ahmed w-1/2 h-100 flex flex-col backdrop-blur-lg bg-gray-800/30 p-3 gap-5 relative border rounded-xl border-white/20">
            <div className="name text-center">
              <h1 className="text-6xl font-bold">Omar Ahmed</h1>
              <p>Backend Developer & Machine Learning</p>
            </div>
            <div className="div text-center text-xl">
              <ul className="list-none">
                <li>Computer Science Student at Helwan National University</li>
                <li>Computer Science Student at Helwan National University</li>
                <li>Computer Science Student at Helwan National University</li>
                <li>Computer Science Student at Helwan National University</li>
              </ul>
            </div>
          </div>
          <div className="about-hamdy w-1/2 h-100 flex flex-col backdrop-blur-lg bg-gray-800/30 p-3 gap-5 relative border rounded-xl border-white/20">
            <div className="name text-center">
              <h1 className="text-6xl font-bold">Omar Hamdy</h1>
              <p>Backend Developer & Machine Learning</p>
            </div>
            <div className="div text-center text-xl">
              <ul className="list-none">
                <li>Computer Science Student at Helwan National University</li>
                <li>Computer Science Student at Helwan National University</li>
                <li>Computer Science Student at Helwan National University</li>
                <li>Computer Science Student at Helwan National University</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
