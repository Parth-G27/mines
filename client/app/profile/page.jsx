"use client";

import React from 'react';
import { useSession } from "next-auth/react";
import Image from 'next/image';

const Profile = () => {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex items-start justify-center pt-20">
      <div className="flex flex-col max-w-2xl w-full bg-white p-10 rounded-3xl shadow-xl">
        
        {/* Name and Image Side by Side */}
        <div className="flex items-center space-x-6 mb-7">
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
          <h1 className="text-4xl font-bold text-green-700">
            {session ? session.user?.name : "Anonymous"}
          </h1>
        </div>

        {/* Email */}
        <p className="text-3xl font-semibold text-green-800 mb-7">
        
          Email : <span className='text-green-600'>{session ? session.user?.email : "No email available"}</span>
        </p>

        <p className="text-3xl font-semibold text-green-800 mb-7">
        
          High Score : <span className='text-green-600'>{}</span>
        </p>

        <p className="text-3xl font-semibold text-green-800 mb-7">
        
          Leaderboard Rank : <span className='text-green-600'>{}</span>
        </p>
        
      </div>
    </div>
  );
};

export default Profile;
