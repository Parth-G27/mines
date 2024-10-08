"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaGem } from "react-icons/fa";
import Toggletheme from "./toggletheme";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);


  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    setUpProviders();

  
  }, []);

  return (
    <nav className="flex-between w-full pt-11 mb-20 dark:bg-medium dark:text-white">
      <Link href="/" className="flex gap-3">
        <FaGem style={{ fontSize: "36px" }} />
<<<<<<< HEAD
        <p className="logo_text dark:text-white">Mines</p>
=======
        <p className="logo_text">Mines Rush</p>
>>>>>>> cf1bcd9e1a39d992cb4dd9090b814a295aad6037
      </Link>



      {/* {alert("providers : "+providers)} */}

      {/* Desktop */}
      <div className="sm:flex hidden dark:text-white">
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
              <div className="dropdown text-center dark:text-white">
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
      <Toggletheme />
    </nav>
  );
};

export default Nav;
