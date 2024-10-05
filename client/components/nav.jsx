"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaGem } from "react-icons/fa";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  //const userLoggedIn = true ;
  const [darkMode, setDarkMode] = useState(false);
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  return (
    <nav className="flex-between w-full pt-11 mb-20">
      <Link href="/" className="flex gap-3">
        <FaGem style={{ fontSize: "36px" }} />
        <p className="logo_text">Mines</p>
      </Link>

      

      {/* {alert("providers : "+providers)} */}

      {/* Desktop */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/play" className="black_btn">
              Play Mines
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={45}
                height={45}
                className="rounded-full mt-1"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      {/*Mobile */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={45}
              height={45}
              className="rounded-full mt-1"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}
            />

            {toggleDropDown && (
              <div className="dropdown text-center">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/play"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}
                >
                  Play Mines
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(flase);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
      <button
        onClick={toggleDarkMode}
        className="bg-gray-600 p-2 rounded-full focus:outline-none"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5a6.5 6.5 0 010-13v13z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 011.484 15.9c-.505.058-1.017.1-1.484.1a8 8 0 01-1.484-15.9c.505-.058 1.017-.1 1.484-.1zM10 18a7.988 7.988 0 01-4.905-1.778 8.008 8.008 0 01-.57-10.8 8.008 8.008 0 0110.8-.57A7.988 7.988 0 0110 18z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </nav>
  );
};

export default Nav;
