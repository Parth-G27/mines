"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { highestScore } from "@/app/api/highestScore/route";

const Profile = () => {
  const { data: session, status } = useSession();
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    if (session) {
      getHighestScore();
    }
  }, [session]);

  const getHighestScore = async () => {
    let response = await highestScore(session);
    if (response.data.highestScore) {
      setHighscore(response.data.highestScore);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-20 px-4 md:px-0">
      <div className="flex flex-col max-w-2xl w-full bg-white p-6 md:p-10 rounded-3xl shadow-xl">
        {/* Name and Image Side by Side */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-7">
          {/* Profile Image */}
          {session && session.user?.image && (
            <Image
              src={session.user.image}
              width={80}
              height={80}
              className="rounded-full border-4 border-green-300 shadow-lg"
              alt="profile"
            />
          )}
          {/* Name */}
          <h1 className="text-2xl md:text-4xl font-bold text-green-700 text-center md:text-left">
            {session ? session.user?.name : "Anonymous"}
          </h1>
        </div>

        {/* Email */}
        <p className="text-xl md:text-3xl font-semibold text-green-800 mb-5 md:mb-7 text-center md:text-left">
          Email:{" "}
          <span className="text-green-600">
            {session ? session.user?.email : "No email available"}
          </span>
        </p>

        <p className="text-xl md:text-3xl font-semibold text-green-800 mb-5 md:mb-7 text-center md:text-left">
          High Score: <span className="text-green-600">{highscore}</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
